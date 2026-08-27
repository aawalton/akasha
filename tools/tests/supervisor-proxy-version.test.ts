
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  _resetProxyVersionStateForTesting,
  getPendingProxyVersion,
  handleProxyVersionUpdate,
  setProxyRespawnFn,
  setUnsubProxyVersion,
  teardownProxyVersionSubscription,
  triggerProxySwap,
} from "../lib/supervisor-proxy-version.ts"

interface Scenario {
  readonly name: string
  readonly drive: () => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

function captureRespawns(): { calls: () => readonly string[] } {
  const calls: string[] = []
  setProxyRespawnFn((version) => {
    calls.push(version)
  })
  return { calls: () => calls.slice() }
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "no-ops when no version is read",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate(null)
      return { calls: calls() }
    },
    standing: { calls: [] },
  },
  {
    name: "latches the first observed version as the baseline without firing",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate("v1")
      return { calls: calls() }
    },
    standing: { calls: [] },
  },
  {
    name: "does not fire when the same version is observed again",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v1")
      return { calls: calls() }
    },
    standing: { calls: [] },
  },
  {
    name: "records the new version as pending WITHOUT invoking respawn (matrix a)",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v2")
      return { calls: calls(), pending: getPendingProxyVersion() }
    },
    standing: { calls: [], pending: "v2" },
  },
  {
    name: "records only the latest pending across multiple bumps, never respawning",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v2")
      handleProxyVersionUpdate("v3")
      return { calls: calls(), pending: getPendingProxyVersion() }
    },
    standing: { calls: [], pending: "v3" },
  },
  {
    name: "does not re-record when the same version is observed again",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v2")
      handleProxyVersionUpdate("v2")
      return { calls: calls(), pending: getPendingProxyVersion() }
    },
    standing: { calls: [], pending: "v2" },
  },
  {
    name: "records pending even when no respawn fn is wired (bumps never touch it)",
    drive: () => {
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v2")
      return { pending: getPendingProxyVersion() }
    },
    standing: { pending: "v2" },
  },
  {
    name: "returns false and does not respawn when no respawn fn is wired",
    drive: () => {
      return { returned: triggerProxySwap() }
    },
    standing: { returned: false },
  },
  {
    name: "invokes the wired respawn fn once and clears pending",
    drive: () => {
      const { calls } = captureRespawns()
      handleProxyVersionUpdate("v1")
      handleProxyVersionUpdate("v2")
      const pendingBeforeSwap = getPendingProxyVersion()

      const returned = triggerProxySwap()
      return {
        pendingBeforeSwap,
        returned,
        callsLength: calls().length,
        pendingAfterSwap: getPendingProxyVersion(),
      }
    },
    standing: { pendingBeforeSwap: "v2", returned: true, callsLength: 1, pendingAfterSwap: null },
  },
  {
    name: "calls and clears the registered unsub",
    drive: () => {
      let called = 0
      setUnsubProxyVersion(() => {
        called += 1
      })
      teardownProxyVersionSubscription()
      const calledAfterFirst = called
      teardownProxyVersionSubscription()
      return { calledAfterFirst, calledAfterSecond: called }
    },
    standing: { calledAfterFirst: 1, calledAfterSecond: 1 },
  },
  {
    name: "is safe when no unsub is registered",
    drive: () => {
      let threw = false
      try {
        teardownProxyVersionSubscription()
      } catch {
        threw = true
      }
      return { threw }
    },
    standing: { threw: false },
  },
  {
    name: "swallows errors from the unsub callback",
    drive: () => {
      setUnsubProxyVersion(() => {
        throw new Error("unsubscribe blew up")
      })
      let threw = false
      try {
        teardownProxyVersionSubscription()
      } catch {
        threw = true
      }
      return { threw }
    },
    standing: { threw: false },
  },
]

function projected(
  observed: Record<string, unknown>,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) picked[key] = observed[key]
  return picked
}

describe("the proxy version state, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      _resetProxyVersionStateForTesting()
      try {
        const observed = decided("ported", { value: scenario.drive(), notice: null })
        const verdict = hold(
          scenario.name,
          scenario.standing,
          projected(observed, scenario.standing)
        )
        expect(verdict.matches).toBe(true)
      } finally {
        _resetProxyVersionStateForTesting()
      }
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
