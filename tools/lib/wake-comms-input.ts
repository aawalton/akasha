import type { CommsInput } from "@akasha/seat-system/seat-wake-rules"
import { AGENT_SENDER_PREFIX } from "./wake-armed-specs.ts"

export interface WakeMessageRow {
  readonly senderAgentId: string | null
  readonly source: string
  readonly content: string
}

export function wakeCommsInput(msg: WakeMessageRow): CommsInput {
  return {
    sender: msg.senderAgentId === null ? msg.source : `${AGENT_SENDER_PREFIX}${msg.senderAgentId}`,
    content: msg.content,
  }
}
