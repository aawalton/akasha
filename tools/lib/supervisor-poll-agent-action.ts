
import type { AgentActionEvent } from "./supervisor-agent-action-types.ts"
import { LOG } from "./supervisor-config.ts"
import { controlOf } from "./seat-control.ts"

// akasha's supervisor-action pages spell these restart, restart-now and swap-proxy.
// Both spellings are read while the fleet moves across; the old ones go once nothing writes them.
const SPELLINGS = new Map<string, AgentActionEvent["action"]>([
  ["restart_preserve", "restart_preserve"],
  ["restart-now", "restart_preserve"],
  ["restart_preserve_on_idle", "restart_preserve_on_idle"],
  ["restart", "restart_preserve_on_idle"],
  ["proxy_swap", "proxy_swap"],
  ["swap-proxy", "proxy_swap"],
])

export function extractAgentAction(attrs: Record<string, unknown> | null): AgentActionEvent | null {
  const spelt = typeof attrs?.requestedAction === "string" ? attrs.requestedAction : null
  const action = spelt === null ? null : (SPELLINGS.get(spelt) ?? null)
  if (action === null) return null
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
