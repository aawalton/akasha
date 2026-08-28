import { ATTRIBUTES } from "../lib/attributes.ts"
import { seatStanding, subagentStated } from "../lib/hold-seat.ts"
import { sentTo } from "../lib/hold-seat-words.ts"
import { hookAgentId, recordingAgentId } from "../lib/read-record.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { namedOwed } from "../lib/owed.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

export function noticeFor(agent: string, root: string): string | null {
  const attributes = subagentStated(agent, root)
  if (attributes === null) return null
  const standing = seatStanding({ agent, root })
  if (standing.refusals.length === 0 && standing.notices.length === 0) return null
  const owed = namedOwed(standing.owed, { ...resolveRoots(), akasha: root })
  if (owed.length === 0) return null
  const said = ATTRIBUTES.flatMap((key) => {
    const one = attributes[key]
    return one === undefined ? [] : [`${key} \`${one.slug}\``]
  }).join(", ")
  return refusalText(
    "subagent-documents-unread",
    {
      attributes: said,
      assignment: sentTo(null),
      count: String(owed.length),
      named: owed.map((relPath) => `--file-path ${relPath}`).join(" "),
    },
    root
  )
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
  if (agent === null || agent === hookAgentId(fields)) return

  const notice = noticeFor(agent, rootFor(resolveRoots(), AKASHA))
  if (notice === null) return
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SubagentStart",
        additionalContext: notice,
      },
    })
  )
}

if (import.meta.main) await main()
