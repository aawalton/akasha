import { akashaObservedOf } from "./seat-akasha-read.ts"
import { keepBeside } from "./seat-beside.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

const CLEARED = {
  requestedAction: null,
  interruptMessage: null,
  restartArmedAt: null,
} as const

// AKASHA ALONE. This laid the old sidecar over the top so that a null it held would beat whatever
// akasha still carried, a request being cleared by writing null rather than by dropping the key.
//
// Akasha is written that null too, and `akashaObservedOf` leaves a null out rather than carrying it
// through — so a cleared request arrives here as a key that is not there instead of a key that is
// null. Every reader of this asks whether the value is a non-empty string, which an absent key and
// a null one both fail, so the two say the same thing to everything that asks.
export function controlOf(agentId: string): Record<string, unknown> | null {
  return akashaObservedOf(agentId)
}

export function requestedActionOf(agentId: string): string | null {
  const held = controlOf(agentId)?.requestedAction
  return typeof held === "string" && held !== "" ? held : null
}

export function setControl(agentId: string, values: Record<string, unknown>): void {
  const page = seatPageForAgent(agentId)
  if (page === null) {
    throw new Error(
      `no seat page stands for agent ${agentId}, so there is no uncommitted file to carry the request. ` +
        "A seat with no page has no agent present in it, and a request reaches only a running seat."
    )
  }
  keepBeside(page, { ...CLEARED, ...values })
}

export function clearControl(agentId: string): void {
  const page = seatPageForAgent(agentId)
  if (page === null) return
  keepBeside(page, CLEARED)
}
