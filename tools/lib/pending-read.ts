import { readAgentMessageRecency } from "./message-recency.ts"
import type { OutboundRecency } from "./pending-decide.ts"
import { seatChildrenOf } from "./seat-children.ts"
import { seatRecord } from "./seat-facts.ts"
import { resolveSeatTarget } from "./seat-handle.ts"
import { seatTurnStateOf, turnStillToCome } from "./seat-turn-state.ts"

export interface PendingSignals {
  readonly selfStopped: boolean
  readonly liveChildren: number
  readonly outbound: OutboundRecency
}

function countChildrenHandingBack(agentId: string): number {
  return seatChildrenOf(agentId).filter((one) => turnStillToCome(seatTurnStateOf(one.id).state))
    .length
}

export async function readPending(handle: string): Promise<PendingSignals> {
  const found = resolveSeatTarget(handle)
  if ("error" in found) throw new Error(found.error)
  const agentId = found.id
  const [liveChildren, outbound] = await Promise.all([
    Promise.resolve().then(() => countChildrenHandingBack(agentId)),
    readAgentMessageRecency(agentId),
  ])
  const seat = seatRecord(agentId)
  const selfStopped = seat === null || seat.presence === "absent"
  return { selfStopped, liveChildren, outbound }
}
