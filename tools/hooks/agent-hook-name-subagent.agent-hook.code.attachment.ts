
import { hookAgentId, recordingAgentId } from "../lib/read-record.ts"

const SPELLABLE = /^[A-Za-z0-9_-]+$/

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  const acting = recordingAgentId(fields)
  if (acting === null || acting === hookAgentId(fields)) return
  if (!SPELLABLE.test(acting)) return
  const input = fields.tool_input
  if (input === null || typeof input !== "object") return
  const call = { ...(input as Record<string, unknown>) }
  if (typeof call.command !== "string" || call.command === "") return
  call.command = `export ACTING_AGENT_ID='${acting}'\n${call.command}`
  console.log(
    JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", updatedInput: call } })
  )
}

await main()
