
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { createTerminalDeathController, type TerminalDeathEffects } from "../lib/pty-terminal-death.ts"

interface Trace {
  readonly returns: readonly boolean[]
  readonly sigterm: number
  readonly sigkill: number
  readonly exit: number
  readonly scheduled: boolean
  readonly cancelled: boolean
}

function rig(): {
  effects: TerminalDeathEffects
  counts: { sigterm: number; sigkill: number; exit: number }
  fire: () => void
  scheduled: () => boolean
  cancelled: () => boolean
} {
  const counts = { sigterm: 0, sigkill: 0, exit: 0 }
  let onElapsed: (() => void) | undefined
  let didCancel = false
  const effects: TerminalDeathEffects = {
    sigtermChild: () => {
      counts.sigterm += 1
    },
    sigkillChild: () => {
      counts.sigkill += 1
    },
    exit: () => {
      counts.exit += 1
    },
    schedule: (fn: () => void): (() => void) => {
      onElapsed = fn
      return () => {
        didCancel = true
      }
    },
  }
  return { effects, counts, fire: () => onElapsed?.(), scheduled: () => onElapsed !== undefined, cancelled: () => didCancel }
}

interface Scenario {
  readonly name: string
  readonly drive: (c: ReturnType<typeof createTerminalDeathController>, r: ReturnType<typeof rig>) => readonly boolean[]
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "SIGTERMs the child and arms the backstop on the first death signal",
    drive: (c) => [c.onDeath()],
    standing: { sigterm: 1, scheduled: true, sigkill: 0, exit: 0 },
  },
  {
    name: "latches: a second death signal is a no-op, with no double SIGTERM and no re-arm",
    drive: (c) => [c.onDeath(), c.onDeath(), c.onDeath()],
    standing: { sigterm: 1 },
  },
  {
    name: "onDeath returns true only on the first acting call, false on every later one",
    drive: (c) => [c.onDeath(), c.onDeath(), c.onDeath()],
    standing: { returns: [true, false, false] },
  },
  {
    name: "onDeath returns false when the child already exited, with no SIGTERM",
    drive: (c) => {
      c.onChildExited()
      return [c.onDeath()]
    },
    standing: { returns: [false], sigterm: 0 },
  },
  {
    name: "escalates to SIGKILL and exit when the grace window elapses",
    drive: (c, r) => {
      const returns = [c.onDeath()]
      r.fire()
      return returns
    },
    standing: { sigkill: 1, exit: 1 },
  },
  {
    name: "cancels the backstop when the child exits naturally",
    drive: (c) => {
      const returns = [c.onDeath()]
      c.onChildExited()
      return returns
    },
    standing: { cancelled: true, sigkill: 0, exit: 0 },
  },
  {
    name: "ignores a death signal arriving after the child already exited",
    drive: (c) => {
      c.onChildExited()
      return [c.onDeath()]
    },
    standing: { sigterm: 0, scheduled: false },
  },
  {
    name: "onChildExited before any death is an inert no-op",
    drive: (c) => {
      c.onChildExited()
      return []
    },
    standing: { sigterm: 0, sigkill: 0, exit: 0 },
  },
]

function run(scenario: Scenario): Trace {
  const r = rig()
  const controller = createTerminalDeathController(r.effects)
  const returns = scenario.drive(controller, r)
  return { returns, ...r.counts, scheduled: r.scheduled(), cancelled: r.cancelled() }
}

function projected(trace: Trace, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = (trace as unknown as Record<string, unknown>)[key]
  return picked
}

describe("createTerminalDeathController, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const trace = decided("ported", { value: run(scenario), notice: null })
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
