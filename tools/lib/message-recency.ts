import { messagesFrom } from "./message-file.ts"
import { seatNameForAgent } from "./messages-agent-tools.ts"
import type { OutboundRecency } from "./pending-decide.ts"

function sentAtMsOf(id: string): number {
  const ms = Number.parseInt(id.replace(/-/g, "").slice(0, 12), 16)
  return Number.isFinite(ms) ? ms : 0
}

export function readAgentMessageRecency(agentId: string): Promise<OutboundRecency> {
  const from = seatNameForAgent(agentId)
  if (from === null) return Promise.resolve({ kind: "none-sent" })
  const standing = messagesFrom(from).filter((one) => one.warrant === "blocked")
  if (standing.length === 0) return Promise.resolve({ kind: "none-sent" })
  return Promise.resolve({ kind: "sent", atMs: Math.max(...standing.map((one) => sentAtMsOf(one.id))) })
}
