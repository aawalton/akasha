
import type { PendingAgentAction } from "./supervisor-agent-action-types.ts"
import { handleRestartPreserve } from "./supervisor-iteration-outcome-handlers.ts"
import type { LoopState } from "./supervisor-loop-state.ts"




export type LoopDirective = "continue" | "break"

export async function dispatchPostExitOutcome(
  pending: PendingAgentAction | null,
  state: LoopState
): Promise<LoopDirective> {
  if (pending === null) return "break"
  const { event } = pending
  if (event.action === "restart_preserve") {
    return handleRestartPreserve(event, pending.maintenance, state)
  }
  return "break"
}
