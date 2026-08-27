
import { deferredRestartRule, buildCapturing, ARM_ON_IDLE, type Scenario } from "./supervisor-agent-action-harness.ts"

export const ARM_SCENARIOS: readonly Scenario[] = [
  {
    name: "arms the idle gate once and does not SIGTERM on the first request",
    drive: async () => {
      const { sub, killed, arms } = buildCapturing()
      await sub.handleAgentAction(ARM_ON_IDLE)
      return {
        armCount: arms.length,
        cancelIsNull: sub.deferredRestart.cancel === null,
        killed: killed(),
      }
    },
    standing: { armCount: 1, cancelIsNull: false, killed: 0 },
  },
  {
    name: "makes a second restart_preserve_on_idle a no-op while already armed",
    drive: async () => {
      const { sub, killed, arms } = buildCapturing()
      await sub.handleAgentAction(ARM_ON_IDLE)
      const cancelAfterFirst = sub.deferredRestart.cancel
      await sub.handleAgentAction(ARM_ON_IDLE)
      await sub.handleAgentAction(ARM_ON_IDLE)
      return {
        armCount: arms.length,
        cancelUnchanged: sub.deferredRestart.cancel === cancelAfterFirst,
        killed: killed(),
        pendingIsNull: sub.pendingEvent.value === null,
      }
    },
    standing: { armCount: 1, cancelUnchanged: true, killed: 0, pendingIsNull: true },
  },
  {
    name: "still arms again after the prior gate was cleared (cancel reset to null)",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      await sub.handleAgentAction(ARM_ON_IDLE)
      sub.deferredRestart.cancel = null
      await sub.handleAgentAction(ARM_ON_IDLE)
      return { armCount: arms.length }
    },
    standing: { armCount: 2 },
  },

  {
    name: "arms every restart_preserve_on_idle with the 30-min ceiling AND the stale-wedge discount",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      await sub.handleAgentAction(ARM_ON_IDLE)
      return {
        armCount: arms.length,
        maxDeferMs: arms[0]?.maxDeferMs ?? null,
        staleWedgeMs: arms[0]?.staleWedgeMs ?? null,
      }
    },
    standing: { armCount: 1, maxDeferMs: 1_800_000, staleWedgeMs: 600_000 },
  },
  {
    name: "threads the row's restartArmedAt as the ceiling anchor (survives re-exec)",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      const originalArm = 1_700_000_000_000
      await sub.handleAgentAction({
        action: "restart_preserve_on_idle",
        interruptMessage: null,
        restartArmedAt: originalArm,
      })
      return { armedAtMs: arms[0]?.armedAtMs ?? null }
    },
    standing: { armedAtMs: 1_700_000_000_000 },
  },
  {
    name: "falls back to a fresh clock when the row carries no armedAt",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      const before = Date.now()
      await sub.handleAgentAction(ARM_ON_IDLE)
      const armedAtMs = arms[0]?.armedAtMs
      return {
        armedAtIsNumber: typeof armedAtMs === "number",
        armedAtInWindow:
          typeof armedAtMs === "number" && armedAtMs >= before && armedAtMs <= Date.now(),
      }
    },
    standing: { armedAtIsNumber: true, armedAtInWindow: true },
  },

  {
    name: "passes pastCliffOverride (cliff age + live child-age reader), no ceiling, no wedge",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      const armed = await sub.armPreCliffRestart()
      const override = arms[0]?.pastCliffOverride
      const declared = await deferredRestartRule.windows({
        maxDeferMs: undefined,
        staleWedgeMs: undefined,
        preCliffOverrideMs: undefined,
      })
      let childAgeThrew = false
      try {
        override?.getChildAgeMs()
      } catch {
        childAgeThrew = true
      }
      return {
        armed,
        armCount: arms.length,
        maxDeferUndefined: arms[0]?.maxDeferMs === undefined,
        staleWedgeUndefined: arms[0]?.staleWedgeMs === undefined,
        cliffAgeMatchesDeclared: override?.cliffAgeMs === declared.value?.preCliffOverrideMs,
        childAgeReaderType: typeof override?.getChildAgeMs,
        childAgeThrew,
      }
    },
    standing: {
      armed: true,
      armCount: 1,
      maxDeferUndefined: true,
      staleWedgeUndefined: true,
      cliffAgeMatchesDeclared: true,
      childAgeReaderType: "function",
      childAgeThrew: false,
    },
  },
  {
    name: "stands down (no second arm) when a monitor is already armed — one restart satisfies both",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      const first = await sub.armPreCliffRestart()
      const second = await sub.armPreCliffRestart()
      return { first, second, armCount: arms.length }
    },
    standing: { first: true, second: false, armCount: 1 },
  },
  {
    name: "stands down when a second arm starts while the first is still asking",
    drive: async () => {
      const { sub, arms } = buildCapturing()
      const [first, second] = await Promise.all([
        sub.armPreCliffRestart(),
        sub.armPreCliffRestart(),
      ])
      return { armsThatSucceeded: [first, second].filter(Boolean).length, armCount: arms.length }
    },
    standing: { armsThatSucceeded: 1, armCount: 1 },
  },
]
