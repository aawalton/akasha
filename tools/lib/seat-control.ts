import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { akashaObservedOf } from "./seat-akasha-read.ts"
import { keepBeside } from "./seat-beside.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

const CLEARED = {
  requestedAction: null,
  interruptMessage: null,
  restartArmedAt: null,
} as const

// BOTH STORES, THE OLD ONE WINNING KEY BY KEY. A request is cleared by writing null rather than by
// dropping it, so a null the old store holds must beat whatever akasha still carries; laying the
// old sidecar over the top does that. What akasha alone holds is a seat whose old page has gone,
// which used to read as no request at all.
export function controlOf(agentId: string): Record<string, unknown> | null {
  const page = seatPageForAgent(agentId)
  const held = page === null ? null : readUncommitted(page)
  const also = akashaObservedOf(agentId)
  if (also === null) return held
  return held === null ? also : { ...also, ...held }
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
