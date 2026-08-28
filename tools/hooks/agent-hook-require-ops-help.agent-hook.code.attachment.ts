import { helpKey, irreversibleCommands, matchCommand, parseOpsCalls } from "../lib/ops-command.ts"
import { readOid, recordingAgentId } from "../lib/read-record.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

function refusal(verb: string): string {
  return refusalText("ops-help-unread", { command: verb }, rootFor(resolveRoots(), AKASHA))
}

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  const agent = recordingAgentId(fields)
  if (agent === null) return
  const input = fields.tool_input
  const command =
    input !== null && typeof input === "object" ? (input as { command?: unknown }).command : null
  if (typeof command !== "string" || command === "") return

  const performing = parseOpsCalls(command).filter((call) => !call.help)
  if (performing.length === 0) return
  const declared = await irreversibleCommands()
  if (declared.size === 0) return

  for (const call of performing) {
    const verb = matchCommand(call, declared)
    if (verb === null) continue
    const held = declared.get(verb)
    if (held === undefined) continue
    if (readOid(agent, helpKey(held.source)) === held.help) continue
    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: refusal(verb),
        },
      })
    )
    return
  }
}

await main()
