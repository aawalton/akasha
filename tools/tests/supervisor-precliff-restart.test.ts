
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import type { PreCliffRestartRuleSource } from "../lib/supervisor-precliff-restart-rule.ts"
import { startPreCliffRestartMonitor } from "../lib/supervisor-precliff-restart.ts"

function preCliffRestartRuleDouble(): PreCliffRestartRuleSource {
  return (obs, thresholdMs) => {
    const value =
      obs.alreadyArmed ||
      obs.childAgeMs === null ||
      obs.childAgeMs < thresholdMs ||
      obs.deferredOrActionPending
        ? "wait"
        : "arm"
    return Promise.resolve({ value, notice: null })
  }
}

const preCliffRestartRule = preCliffRestartRuleDouble()

const THRESHOLD = 27_600_000
const NOW = 10_000_000_000

type HarnessOver = {
  pid?: number | null
  startMs?: number | null
  isDeferredArmed?: boolean
  armReturns?: boolean
  requestedAction?: string | null
}

function startHarness(over?: HarnessOver) {
  const arms: number[] = []
  let pid: number | null = over && "pid" in over ? (over.pid ?? null) : 1234
  let startMs: number | null = over && "startMs" in over ? (over.startMs ?? null) : NOW - THRESHOLD
  const monitor = startPreCliffRestartMonitor({
    getClaudePid: () => pid,
    getAgentId: () => "agent-x",
    isDeferredArmed: () => over?.isDeferredArmed ?? false,
    armPreCliff: () => {
      const ok = over?.armReturns ?? true
      if (ok) arms.push(pid ?? -1)
      return Promise.resolve(ok)
    },
    thresholdMs: THRESHOLD,
    preCliffRestartRule,
    log: () => {},
    now: () => NOW,
    tickMs: 3,
    readStartMs: () => startMs,
    readRequestedAction: async () => over?.requestedAction ?? null,
  })
  return {
    arms,
    monitor,
    setPid: (p: number | null) => {
      pid = p
    },
    setStartMs: (s: number | null) => {
      startMs = s
    },
  }
}

async function settle(ms = 30): Promise<void> {
  await Bun.sleep(ms)
}

async function until(pred: () => boolean, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (!pred() && Date.now() < deadline) await Bun.sleep(5)
}

interface Scenario {
  readonly name: string
  readonly drive: () => Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}

function ended(arms: readonly number[], phases: Record<string, unknown> = {}) {
  return { armCount: arms.length, firstArm: arms[0] ?? null, arms: [...arms], ...phases }
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "arms once when the child is past the threshold",
    drive: async () => {
      const h = startHarness({ startMs: NOW - THRESHOLD })
      await until(() => h.arms.length > 0)
      await settle()
      h.monitor.stop()
      return ended(h.arms)
    },
    standing: { armCount: 1, firstArm: 1234 },
  },
  {
    name: "never arms while the child is below the threshold",
    drive: async () => {
      const h = startHarness({ startMs: NOW - (THRESHOLD - 1) })
      await settle()
      h.monitor.stop()
      return ended(h.arms)
    },
    standing: { armCount: 0 },
  },
  {
    name: "fail-safe: a null process start time never arms",
    drive: async () => {
      const h = startHarness({ startMs: null })
      await settle()
      h.monitor.stop()
      return ended(h.arms)
    },
    standing: { armCount: 0 },
  },
  {
    name: "stands down when a deferred monitor is already armed",
    drive: async () => {
      const h = startHarness({ startMs: NOW - THRESHOLD, isDeferredArmed: true })
      await settle()
      h.monitor.stop()
      return ended(h.arms)
    },
    standing: { armCount: 0 },
  },
  {
    name: "stands down when a requestedAction is already pending on the row",
    drive: async () => {
      const h = startHarness({ startMs: NOW - THRESHOLD, requestedAction: "restart_preserve" })
      await settle()
      h.monitor.stop()
      return ended(h.arms)
    },
    standing: { armCount: 0 },
  },
  {
    name: "a refused arm (race) is not latched — it re-arms on a later tick",
    drive: async () => {
      let allow = false
      const arms: number[] = []
      const monitor = startPreCliffRestartMonitor({
        getClaudePid: () => 4321,
        getAgentId: () => "agent-y",
        isDeferredArmed: () => false,
        armPreCliff: () => {
          if (!allow) return Promise.resolve(false)
          arms.push(4321)
          return Promise.resolve(true)
        },
        thresholdMs: THRESHOLD,
        preCliffRestartRule,
        log: () => {},
        now: () => NOW,
        tickMs: 3,
        readStartMs: () => NOW - THRESHOLD,
        readRequestedAction: async () => null,
      })
      await settle(20)
      const armCountWhileRefused = arms.length
      allow = true
      await until(() => arms.length > 0)
      monitor.stop()
      return ended(arms, { armCountWhileRefused })
    },
    standing: { armCountWhileRefused: 0, armCount: 1 },
  },
  {
    name: "a new generation (pid change) re-arms after a prior generation armed",
    drive: async () => {
      const h = startHarness({ pid: 1000, startMs: NOW - THRESHOLD })
      await until(() => h.arms.length === 1)
      await settle()
      const armCountWhileLatched = h.arms.length
      h.setPid(2000)
      await until(() => h.arms.length === 2)
      h.monitor.stop()
      return ended(h.arms, { armCountWhileLatched })
    },
    standing: { armCountWhileLatched: 1, arms: [1000, 2000] },
  },
]

function projected(trace: Record<string, unknown>, shape: Record<string, unknown>) {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = trace[key]
  return picked
}

describe("startPreCliffRestartMonitor, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const trace = decided("ported", { value: await scenario.drive(), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(trace, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
