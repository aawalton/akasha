import { patchUncommitted, readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

const CLEARED = {
  requestedAction: null,
  interruptMessage: null,
  restartArmedAt: null,
} as const

export function controlOf(agentId: string): Record<string, unknown> | null {
  const page = seatPageForAgent(agentId)
  return page === null ? null : readUncommitted(page)
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
  patchUncommitted(page, { ...CLEARED, ...values })
}

export function clearControl(agentId: string): void {
  const page = seatPageForAgent(agentId)
  if (page === null) return
  patchUncommitted(page, CLEARED)
}
