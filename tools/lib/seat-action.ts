import { controlOf, setControl } from "./seat-control.ts"

const DEFAULT_TIMEOUT_MS = 30_000

const DEFAULT_POLL_MS = 500

export type AgentActionRequest =
  | { action: "restart_preserve"; interruptMessage?: string }
  | { action: "restart_preserve_on_idle"; interruptMessage?: string }
  | { action: "proxy_swap"; interruptMessage?: never }

export type ActionAckOutcome =
  | { readonly ok: true }
  | {
      readonly ok: false
      readonly reason: {
        readonly agentId: string
        readonly timeoutMs: number
        readonly lastRequestedAction: string | null
      }
    }

export type AckVerb = "restart" | "proxy-swap"

type AckTimeoutReason = Extract<ActionAckOutcome, { ok: false }>["reason"]

export function describeAckTimeout(verb: AckVerb, reason: AckTimeoutReason): string {
  return (
    `${verb}: the supervisor did not take up requestedAction within ${reason.timeoutMs}ms ` +
    `(agentId=${reason.agentId}, lastRequestedAction=${reason.lastRequestedAction ?? "null"}). ` +
    "The supervisor's channel is closed or its process is gone, both of which its recent log names."
  )
}

export function buildRequestedActionSet(
  request: AgentActionRequest,
  armedAtMs?: number
): Record<string, unknown> {
  const set: Record<string, unknown> = {
    requestedAction: request.action,
  }
  if (request.interruptMessage != null) set.interruptMessage = request.interruptMessage
  if (request.action === "restart_preserve_on_idle" && armedAtMs != null) {
    set.restartArmedAt = armedAtMs
  }
  return set
}

export async function setRequestedAction(
  agentId: string,
  request: AgentActionRequest
): Promise<void> {
  setControl(
    agentId,
    buildRequestedActionSet(
      request,
      request.action === "restart_preserve_on_idle" ? Date.now() : undefined
    )
  )
}

function actionText(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null
}

export async function waitForActionCleared(
  agentId: string,
  opts: { timeoutMs?: number; pollMs?: number } = {}
): Promise<ActionAckOutcome> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const pollMs = opts.pollMs ?? DEFAULT_POLL_MS
  const deadline = Date.now() + timeoutMs
  while (true) {
    const held = controlOf(agentId)
    if (held === null) {
      throw new Error(`waitForActionCleared: no seat page stands for agent ${agentId} to answer`)
    }
    const lastRequestedAction = actionText(held.requestedAction)
    if (lastRequestedAction === null) return { ok: true }
    if (Date.now() >= deadline) {
      return { ok: false, reason: { agentId, timeoutMs, lastRequestedAction } }
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs))
  }
}
