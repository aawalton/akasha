
import { helpKey, irreversibleCommands, matchCommand, parseOpsCalls } from "../lib/ops-command.ts"
import { recordingAgentId, recordRead } from "../lib/read-record.ts"

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
  const command = input !== null && typeof input === "object" ? (input as { command?: unknown }).command : null
  if (typeof command !== "string" || command === "") return

  const asked = parseOpsCalls(command).filter((call) => call.help)
  if (asked.length === 0) return
  const declared = await irreversibleCommands()
  if (declared.size === 0) return

  for (const call of asked) {
    const verb = matchCommand(call, declared)
    if (verb === null) continue
    const held = declared.get(verb)
    if (held === undefined) continue
    recordRead(agent, helpKey(held.source), Date.now(), held.help)
  }
}

await main()
