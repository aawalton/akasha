
import { consumeThenProxySwap } from "../lib/supervisor-agent-action-clear"
import type { AgentActionEvent } from "../lib/supervisor-agent-action-types.ts"
import { build, buildFireHarness, type Scenario } from "./supervisor-agent-action-harness.ts"

export const FIRE_SCENARIOS: readonly Scenario[] = [
  {
    name: "clears the agent row BEFORE the SIGTERM when the idle gate fires",
    drive: async () => {
      const h = buildFireHarness()
      await h.armIdle()
      await h.arms[0]?.onIdle?.("idle")
      return { order: [...h.order] }
    },
    standing: { order: ["clear:amy", "kill"] },
  },
  {
    name: "does NOT clear the row while merely armed (pre-fire) — #14967 row-preserve invariant",
    drive: async () => {
      const h = buildFireHarness()
      await h.armIdle()
      return { order: [...h.order], armCount: h.arms.length }
    },
    standing: { order: [], armCount: 1 },
  },
  {
    name: "consumes the arm at fire and stays latched so any post-fire redelivery arms nothing",
    drive: async () => {
      const h = buildFireHarness()
      await h.armIdle()
      const cancelAfterArm = h.sub.deferredRestart.cancel
      await h.arms[0]?.onIdle?.("idle")
      const order = [...h.order]
      const cancelUnchanged = h.sub.deferredRestart.cancel === cancelAfterArm
      await h.armIdle()
      await h.armIdle()
      return { order, cancelUnchanged, armCount: h.arms.length }
    },
    standing: { order: ["clear:amy", "kill"], cancelUnchanged: true, armCount: 1 },
  },
  {
    name: "still re-arms after an EXTERNAL teardown nulls the latch (rebind / next iteration)",
    drive: async () => {
      const h = buildFireHarness()
      await h.armIdle()
      await h.arms[0]?.onIdle?.("idle")
      h.sub.deferredRestart.cancel = null
      await h.armIdle()
      return { armCount: h.arms.length }
    },
    standing: { armCount: 2 },
  },

  ...(["restart_preserve"] as const).map((action) => ({
    name: `${action} SIGTERMs immediately without clearing-at-fire or arming`,
    drive: async () => {
      const h = buildFireHarness()
      await h.sub.handleAgentAction({ action, interruptMessage: null })
      return {
        order: [...h.order],
        armCount: h.arms.length,
        pendingAction: h.sub.pendingEvent.value?.event.action ?? null,
      }
    },
    standing: { order: ["kill"], armCount: 0, pendingAction: action },
  })),

  {
    name: "a pre-cliff arm firing on a GENUINELY-IDLE cause marks the pending action maintenance",
    drive: async () => {
      const h = buildFireHarness()
      const armed = await h.sub.armPreCliffRestart()
      await h.arms[0]?.onIdle?.("idle")
      return {
        armed,
        pendingAction: h.sub.pendingEvent.value?.event.action ?? null,
        maintenance: h.sub.pendingEvent.value?.maintenance ?? null,
      }
    },
    standing: { armed: true, pendingAction: "restart_preserve", maintenance: true },
  },
  {
    name: "a pre-cliff arm firing WHILE BUSY (past-cliff-override) is NOT maintenance — keeps the immediate notice",
    drive: async () => {
      const h = buildFireHarness()
      await h.sub.armPreCliffRestart()
      await h.arms[0]?.onIdle?.("past-cliff-override")
      return { maintenance: h.sub.pendingEvent.value?.maintenance ?? null }
    },
    standing: { maintenance: false },
  },
  {
    name: "a CLI restart_preserve_on_idle arm firing idle is NOT maintenance (only the pre-cliff arm defers)",
    drive: async () => {
      const h = buildFireHarness()
      await h.armIdle()
      await h.arms[0]?.onIdle?.("idle")
      return { maintenance: h.sub.pendingEvent.value?.maintenance ?? null }
    },
    standing: { maintenance: false },
  },
  {
    name: "a row-sourced action is never maintenance — the tag has one producer, and it is the fire",
    drive: async () => {
      const h = buildFireHarness()
      await h.sub.handleAgentAction({
        action: "restart_preserve",
        interruptMessage: "operator text",
      })
      return { maintenance: h.sub.pendingEvent.value?.maintenance ?? null }
    },
    standing: { maintenance: false },
  },

  {
    name: "consumeThenProxySwap awaits clear to completion, then invokes swap",
    drive: async () => {
      const order: string[] = []
      await consumeThenProxySwap({
        clear: async () => {
          order.push("clear")
        },
        swap: () => {
          order.push("swap")
        },
      })
      return { order }
    },
    standing: { order: ["clear", "swap"] },
  },
  {
    name: "consumeThenProxySwap does not swap when clear rejects (a failed consume never swaps)",
    drive: async () => {
      let swapped = false
      let rejectedWith: string | null = null
      try {
        await consumeThenProxySwap({
          clear: async () => {
            throw new Error("clear failed")
          },
          swap: () => {
            swapped = true
          },
        })
      } catch (err) {
        rejectedWith = err instanceof Error ? err.message : String(err)
      }
      return { rejectedWith, swapped }
    },
    standing: { rejectedWith: "clear failed", swapped: false },
  },

  {
    name: "proxy_swap fires onProxySwap and never SIGTERMs Claude",
    drive: async () => {
      let calls = 0
      const { sub, killed } = build(
        () => ({ cancel: () => {} }),
        async () => {
          calls++
        }
      )
      await sub.handleAgentAction({ action: "proxy_swap" })
      await Promise.resolve()
      return { calls, killed: killed(), cancelIsNull: sub.deferredRestart.cancel === null }
    },
    standing: { calls: 1, killed: 0, cancelIsNull: true },
  },
  {
    name: "collapses a redelivered proxy_swap to a single swap while one is in flight (matrix c)",
    drive: async () => {
      let calls = 0
      let release!: () => void
      const gate = new Promise<void>((resolve) => {
        release = resolve
      })
      const { sub } = build(
        () => ({ cancel: () => {} }),
        async () => {
          calls++
          await gate
        }
      )
      const evt: AgentActionEvent = { action: "proxy_swap" }
      await sub.handleAgentAction(evt)
      await sub.handleAgentAction(evt)
      const callsWhileInFlight = calls
      release()
      await Promise.resolve()
      await Promise.resolve()
      await sub.handleAgentAction(evt)
      await Promise.resolve()
      return { callsWhileInFlight, calls }
    },
    standing: { callsWhileInFlight: 1, calls: 2 },
  },
]
