
import type { AgentActionEvent } from "./supervisor-agent-action-types.ts"
import { LOG } from "./supervisor-config.ts"
import { controlOf } from "./seat-control.ts"

export function extractAgentAction(attrs: Record<string, unknown> | null): AgentActionEvent | null {
  const action = typeof attrs?.requestedAction === "string" ? attrs.requestedAction : null
  if (
    action !== "restart_preserve" &&
    action !== "restart_preserve_on_idle" &&
    action !== "proxy_swap"
  )
    return null
  if (action === "proxy_swap") return { action }
  const interruptMessage =
    typeof attrs?.interruptMessage === "string" ? attrs.interruptMessage : null
  if (action === "restart_preserve") return { action, interruptMessage }
  const restartArmedAt = typeof attrs?.restartArmedAt === "number" ? attrs.restartArmedAt : null
  return { action, interruptMessage, restartArmedAt }
}

export async function readAgentAction(agentId: string): Promise<AgentActionEvent | null> {
  try {
    return extractAgentAction(controlOf(agentId))
  } catch (err) {
    console.error(`${LOG} action poll: reading agent ${agentId} failed:`, err)
    return null
  }
}

export async function pollAgentAction(
  getAgentId: () => string | null,
  deliver: (event: AgentActionEvent) => void | Promise<void>
): Promise<void> {
  const agentId = getAgentId()
  if (agentId === null || agentId === "") return
  const event = await readAgentAction(agentId)
  if (event === null) return
  await deliver(event)
}
