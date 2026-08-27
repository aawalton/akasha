
import { unclaimedTo } from "./message-file.ts"
import { seatNameForAgent } from "./messages-agent-tools.ts"

export interface InboundMessageRow {
  readonly sender_agent_id: string | null
  readonly source: string
  readonly content: string
}

const MESSAGE_SOURCE = "user"

export function getAgentInboundMessages(
  targetAgentId: string
): Promise<readonly InboundMessageRow[]> {
  const to = seatNameForAgent(targetAgentId)
  if (to === null) return Promise.resolve([])
  return Promise.resolve(
    unclaimedTo(to).map((one) => ({
      sender_agent_id: one.from === "" ? null : one.from,
      source: MESSAGE_SOURCE,
      content: one.body,
    }))
  )
}
