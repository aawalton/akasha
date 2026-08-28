import { hookAgentId, recordingAgentId } from "../lib/read-record.ts"
import { endsOf, reportOf } from "../lib/subagent-end.ts"
import {
  removeSubagentPage,
  removeSubagentPagesOf,
  standingSubagentsOf,
  writeSubagentPage,
} from "../lib/subagent-page.ts"
import { SUBAGENT_MARK } from "../lib/subagent.ts"

const STOPPING = "SubagentStop"

const SESSION_STARTING = "SessionStart"

const AFTER_TOOL = "PostToolUse"

const STOP_TOOL = "TaskStop"

const PROCESS_SURVIVES: readonly string[] = ["compact"]

export function clearsSubagentPages(source: string): boolean {
  return !PROCESS_SURVIVES.includes(source)
}

function saidOfStanding(seat: string): string {
  try {
    return reportOf(endsOf(standingSubagentsOf(seat)))
  } catch {
    return ""
  }
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
  const seat = hookAgentId(fields)
  if (seat === null) return
  const event = fields.hook_event_name

  if (event === SESSION_STARTING) {
    if (!clearsSubagentPages(String(fields.source ?? ""))) return
    const said = saidOfStanding(seat)
    removeSubagentPagesOf(seat, "started again")
    if (said !== "") console.log(said)
    return
  }

  if (event === AFTER_TOOL) {
    if (fields.tool_name !== STOP_TOOL) return
    const asked = fields.tool_input
    const stopped =
      asked !== null && typeof asked === "object" ? (asked as { task_id?: unknown }).task_id : null
    if (typeof stopped !== "string" || stopped === "") return
    removeSubagentPage(`${seat}${SUBAGENT_MARK}${stopped}`)
    return
  }

  const agent = recordingAgentId(fields)
  if (agent === null || agent === seat) return
  if (event === STOPPING) {
    removeSubagentPage(agent)
    return
  }
  const dispatchedAs = fields.agent_type
  if (typeof dispatchedAs !== "string" || dispatchedAs === "") return
  writeSubagentPage(agent, dispatchedAs)
}

if (import.meta.main) await main()
