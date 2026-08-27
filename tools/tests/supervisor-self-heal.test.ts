
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { handleVersionUpdate, requestSelfHealRestart } from "../lib/supervisor-self-heal.ts"
import { _resetSelfHealStateForTesting, _setArmReExecGateForTesting, _setKillSelfForTesting, _setRandomFloatForTesting, _setRunInstallForTesting, _setScheduleReExecForTesting, _setSelfHealRuleSourcesForTesting, isPendingReExec } from "../lib/supervisor-self-heal-state"
import {
  deferredRestartRuleDouble,
  selfHealJitterRuleDouble,
} from "./supervisor-rule-test-helpers.ts"

type Killed = ReadonlyArray<NodeJS.Signals>
type InstallResult = { ok: true } | { ok: false; stderr: string }

beforeEach(() => {
  _resetSelfHealStateForTesting()
})

afterEach(() => {
  _resetSelfHealStateForTesting()
})

function captureKills(): { killed: () => Killed } {
  const killed: NodeJS.Signals[] = []
  _setKillSelfForTesting((sig: NodeJS.Signals) => {
    killed.push(sig)
    return true
  })
  return { killed: () => killed.slice() }
}

function captureInstalls(result: InstallResult = { ok: true }): { calls: () => number } {
  return captureInstallsWith(() => Promise.resolve(result))
}

function captureInstallsWith(factory: () => Promise<InstallResult>): { calls: () => number } {
  let calls = 0
  _setRunInstallForTesting(async () => {
    calls += 1
    return await factory()
  })
  return { calls: () => calls }
}

function fireReExecSynchronously(): undefined {
  _setSelfHealRuleSourcesForTesting({
    selfHealJitterRule: selfHealJitterRuleDouble(),
    deferredRestartRule: deferredRestartRuleDouble(),
  })
  _setRandomFloatForTesting(() => 0)
  _setArmReExecGateForTesting((opts) => {
    opts.onIdle()
    return { cancel: () => {} }
  })
  _setScheduleReExecForTesting((cb) => {
    cb()
  })
}

function holdAgainstStanding<T>(decision: string, standing: T, ported: T): void {
  const verdict = hold(decision, standing, ported)
  if (!verdict.matches) expect(ported).toEqual(standing)
  expect(verdict.matches).toBe(true)
}

describe("requestSelfHealRestart", () => {
  it("kills with SIGTERM on first call", () => {
    const { killed } = captureKills()
    requestSelfHealRestart("v1")
    holdAgainstStanding(
      "first-call-sigterms",
      { killed: ["SIGTERM"], pending: true },
      { killed: killed(), pending: isPendingReExec() }
    )
  })

  it("latches pendingReExec so concurrent updates collapse to one SIGTERM", () => {
    const { killed } = captureKills()
    requestSelfHealRestart("v2")
    requestSelfHealRestart("v2")
    requestSelfHealRestart("v2")
    holdAgainstStanding(
      "repeat-calls-collapse",
      { killed: ["SIGTERM"], pending: true },
      { killed: killed(), pending: isPendingReExec() }
    )
  })

  it("resets the latch when killSelf throws so a later update can retry", () => {
    let firstCall = true
    _setKillSelfForTesting(() => {
      if (firstCall) {
        firstCall = false
        throw new Error("kill failed")
      }
      return true
    })
    requestSelfHealRestart("v3-fail")
    const pendingAfterFailure = isPendingReExec()
    requestSelfHealRestart("v3-retry")
    holdAgainstStanding(
      "kill-throw-releases-latch",
      { pendingAfterFailure: false, pendingAfterRetry: true },
      { pendingAfterFailure, pendingAfterRetry: isPendingReExec() }
    )
  })
})

describe("handleVersionUpdate", () => {
  beforeEach(() => {
    fireReExecSynchronously()
  })

  it("latches the initial version without running install or sending SIGTERM", async () => {
    const { killed } = captureKills()
    const { calls } = captureInstalls()
    await handleVersionUpdate({ liveVersion: "v-initial", deployedAt: 1 })
    holdAgainstStanding(
      "initial-version-latches",
      { calls: 0, killed: [], pending: false },
      { calls: calls(), killed: killed(), pending: isPendingReExec() }
    )
  })

  it("ignores a repeated identical version", async () => {
    const { killed } = captureKills()
    const { calls } = captureInstalls()
    await handleVersionUpdate({ liveVersion: "v-same", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-same", deployedAt: 2 })
    holdAgainstStanding(
      "identical-version-ignored",
      { calls: 0, killed: [] },
      { calls: calls(), killed: killed() }
    )
  })

  it("ignores a null payload", async () => {
    const { killed } = captureKills()
    const { calls } = captureInstalls()
    await handleVersionUpdate(null)
    holdAgainstStanding(
      "null-payload-ignored",
      { calls: 0, killed: [] },
      { calls: calls(), killed: killed() }
    )
  })

  it("runs install then SIGTERMs on a new version", async () => {
    const { killed } = captureKills()
    const { calls } = captureInstalls({ ok: true })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-next", deployedAt: 2 })
    holdAgainstStanding(
      "new-version-installs-then-sigterms",
      { calls: 1, killed: ["SIGTERM"], pending: true },
      { calls: calls(), killed: killed(), pending: isPendingReExec() }
    )
  })

  it("skips SIGTERM and stays on old image when install fails, retrying on the next event", async () => {
    const { killed } = captureKills()
    let attempt = 0
    const { calls } = captureInstallsWith(async () => {
      attempt += 1
      if (attempt === 1) return { ok: false, stderr: "boom" }
      return { ok: true }
    })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-fail", deployedAt: 2 })
    const afterFailure = { calls: calls(), killed: killed(), pending: isPendingReExec() }
    await handleVersionUpdate({ liveVersion: "v-retry", deployedAt: 3 })
    holdAgainstStanding(
      "install-failure-then-retry",
      {
        afterFailure: { calls: 1, killed: [], pending: false },
        afterRetry: { calls: 2, killed: ["SIGTERM"], pending: true },
      },
      {
        afterFailure,
        afterRetry: { calls: calls(), killed: killed(), pending: isPendingReExec() },
      }
    )
  })

  it("does not double-install while a self-heal is already pending", async () => {
    const { killed } = captureKills()
    const { calls } = captureInstalls({ ok: true })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-next", deployedAt: 2 })
    await handleVersionUpdate({ liveVersion: "v-newer", deployedAt: 3 })
    holdAgainstStanding(
      "no-double-install-while-pending",
      { calls: 1, killed: ["SIGTERM"] },
      { calls: calls(), killed: killed() }
    )
  })

  it("does not stack installs when a second version event arrives mid-install", async () => {
    const { killed } = captureKills()
    let resolveFirst!: (value: InstallResult) => void
    const firstInstall = new Promise<InstallResult>((r) => {
      resolveFirst = r
    })
    let attempt = 0
    const { calls } = captureInstallsWith(async () => {
      attempt += 1
      if (attempt === 1) return await firstInstall
      return { ok: true }
    })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    const inFlight = handleVersionUpdate({ liveVersion: "v-mid", deployedAt: 2 })
    await handleVersionUpdate({ liveVersion: "v-mid-2", deployedAt: 3 })
    const midInstall = { calls: calls(), killed: killed() }
    resolveFirst({ ok: true })
    await inFlight
    holdAgainstStanding(
      "second-event-mid-install-does-not-stack",
      {
        midInstall: { calls: 1, killed: [] },
        afterSettle: { calls: 1, killed: ["SIGTERM"] },
      },
      { midInstall, afterSettle: { calls: calls(), killed: killed() } }
    )
  })

  it("schedules the re-exec SIGTERM after a jittered delay rather than firing immediately", async () => {
    const { killed } = captureKills()
    captureInstalls({ ok: true })
    const captured: { delay: number | null; cb: (() => void) | null } = { delay: null, cb: null }
    _setRandomFloatForTesting(() => 0.5)
    _setScheduleReExecForTesting((cb, delayMs) => {
      captured.cb = cb
      captured.delay = delayMs
    })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-jitter", deployedAt: 2 })
    const beforeDelayElapses = {
      delay: captured.delay,
      killed: killed(),
      pending: isPendingReExec(),
    }
    captured.cb?.()
    holdAgainstStanding(
      "jittered-delay-scheduled-not-fired",
      {
        beforeDelayElapses: { delay: 30_000, killed: [], pending: false },
        afterDelayElapses: { killed: ["SIGTERM"], pending: true },
      },
      {
        beforeDelayElapses,
        afterDelayElapses: { killed: killed(), pending: isPendingReExec() },
      }
    )
  })

  it("arms the idle gate and defers the SIGTERM until the session goes idle", async () => {
    const { killed } = captureKills()
    captureInstalls({ ok: true })
    _setRandomFloatForTesting(() => 0)
    _setScheduleReExecForTesting((cb) => cb())
    const gate: { onIdle: (() => void) | null; cancelled: boolean } = {
      onIdle: null,
      cancelled: false,
    }
    _setArmReExecGateForTesting((opts) => {
      gate.onIdle = opts.onIdle
      return {
        cancel: () => {
          gate.cancelled = true
        },
      }
    })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-busy", deployedAt: 2 })
    const whileBusy = {
      gateArmed: gate.onIdle !== null,
      killed: killed(),
      pending: isPendingReExec(),
    }
    await gate.onIdle?.()
    holdAgainstStanding(
      "idle-gate-defers-until-idle",
      {
        whileBusy: { gateArmed: true, killed: [], pending: false },
        onceIdle: { killed: ["SIGTERM"], pending: true },
      },
      { whileBusy, onceIdle: { killed: killed(), pending: isPendingReExec() } }
    )
  })

  it("does not schedule a second re-exec while one is already pending in the jitter window", async () => {
    const { killed } = captureKills()
    let scheduleCount = 0
    const { calls } = captureInstalls({ ok: true })
    _setRandomFloatForTesting(() => 0)
    _setScheduleReExecForTesting(() => {
      scheduleCount += 1
    })
    await handleVersionUpdate({ liveVersion: "v-base", deployedAt: 1 })
    await handleVersionUpdate({ liveVersion: "v-first", deployedAt: 2 })
    await handleVersionUpdate({ liveVersion: "v-second", deployedAt: 3 })
    holdAgainstStanding(
      "no-second-schedule-in-jitter-window",
      { scheduleCount: 1, calls: 1, killed: [] },
      { scheduleCount, calls: calls(), killed: killed() }
    )
  })
})
