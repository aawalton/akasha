import type { PendingAgentAction } from "@akasha/seat-system/supervisor-agent-action-types"
import { handleRestartNow } from "./supervisor-iteration-outcome-handlers.ts"
import type { LoopState } from "./supervisor-loop-state.ts"

export type LoopDirective = "continue" | "break"

export async function dispatchPostExitOutcome(
  pending: PendingAgentAction | null,
  state: LoopState
): Promise<LoopDirective> {
  if (pending === null) return "break"
  const { event } = pending
  if (event.action === "restart-now") {
    return handleRestartNow(event, pending.maintenance, state)
  }
  return "break"
}
