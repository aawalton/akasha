
import { seatStanding, stoodAside } from "../lib/hold-seat.ts"
import { recordingAgentId } from "../lib/read-record.ts"
import { fromDisk, refusalText } from "../lib/refusal.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

export const PERMITTED_TOOLS: readonly string[] = []

const READ_OR_SEARCH =
  /^(?:cd\s+[^\s&;|<>()`$]+\s+&&\s+)?(?:bun\s+\S*tools\/(?:read|search)\.ts|ops\s+(?:read|search))\b[^&;|<>()`$]*$/

export function permitted(tool: string): boolean {
  return PERMITTED_TOOLS.includes(tool)
}

export function clearsTheHold(tool: string, command: string): boolean {
  return tool === "Bash" && READ_OR_SEARCH.test(command.trim())
}

function commandOf(fields: Record<string, unknown>): string {
  const input = fields.tool_input
  if (input === null || typeof input !== "object") return ""
  const { command } = input as { command?: unknown }
  return typeof command === "string" ? command : ""
}

function deny(reason: string): void {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    })
  )
}

function announce(message: string): void {
  console.log(JSON.stringify({ systemMessage: message }))
}

export type Decision = { readonly deny: string } | { readonly say: string } | null

export function judge(fields: Record<string, unknown>): Decision {
  const tool = typeof fields.tool_name === "string" ? fields.tool_name : ""
  if (tool === "") return null

  if (permitted(tool)) return null
  if (clearsTheHold(tool, commandOf(fields))) return null

  const root = rootFor(resolveRoots(), AKASHA)
  const standing = seatStanding({ agent: recordingAgentId(fields), root })
  const stopping = [...standing.refusals, ...standing.notices]
  if (stopping.length > 0) {
    const said = refusalText(
      "seat-tools-permitted",
      {},
      root,
      fromDisk
    )
    return { deny: `${stopping.join("\n\n")}\n\n${said}` }
  }
  if (stoodAside(standing)) return { say: `hold-seat: ${standing.detail}` }
  return null
}

function emit(decision: Decision): void {
  if (decision === null) return
  if ("deny" in decision) return deny(decision.deny)
  announce(decision.say)
}

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return announce("hold-seat: the hook payload would not parse, so nothing was checked")
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  let decision: Decision
  try {
    decision = judge(fields)
  } catch (error) {
    decision = {
      say:
        `hold-seat: the check itself failed, so the act proceeded unchecked — ` +
        `${error instanceof Error ? error.message : String(error)}`,
    }
  }
  emit(decision)
}

if (import.meta.main) await main()
