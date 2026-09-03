import { everyOfType } from "@akasha/indexes"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { akashaSeatPathForAgent } from "../../akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"

// WHERE AN AGENT'S PAGE STANDS, ANSWERED ONLY WHERE THE PAGE IS THERE.
//
// A ROW MUST NEVER NAME A PAGE THAT IS NOT THERE. Every path answered here is opened at the moment
// of answering rather than handed on from the index that named it. `valueAt` stats the path and
// answers null for anything that is not a file, so it is the existence check; and it hands back
// what that file declares, so the identity is read off the same bytes the existence was proved of.
// The two cannot disagree the way an `existsSync` and a later read can.
//
// The check is not ceremony. A seat's page goes when its seat stops and a subagent's page goes when
// the subagent returns, and both happen while an answer is being composed. An index naming a page
// that has since gone is the ordinary case here rather than the corrupt one.

const SUBAGENT = "subagent"

const ID = "id"

const PRINCIPAL_SEAT_NAME = "principalSeatName"

const AGENT_ID = "agentId"

// Two hyphens part a seat's id from the id a subagent runs under, which is what the subagent
// page type's `agent-id` states of itself.
const SUBAGENT_MARK = "--"

function declaredAt(at: string, root: string): Value | null {
  return valueAt(at, root)
}

function textIn(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" && held !== "" ? held : null
}

// The page akasha holds for this agent, or null where it holds none. The index answers by id
// across every page type and `akashaSeatPathForAgent` keeps that hit to the seat folder; what is
// added here is that the file is opened and made to declare the id it was found under, so a path
// re-occupied since the index was written answers nothing rather than answering the wrong page.
export function seatPageAt(agentId: string, root: string): string | null {
  const at = akashaSeatPathForAgent(agentId)
  if (at === null) return null
  const held = declaredAt(at, root)
  return held !== null && textIn(held, ID) === agentId ? at : null
}

export interface SubagentPage {
  readonly seat: string
  readonly own: string
  readonly at: string
}

// EVERY SUBAGENT PAGE AKASHA HOLDS, KEYED THE WAY A RUNNING SUBAGENT IS KNOWN TO WHOEVER DRAWS ONE:
// the name of the seat that ran it, and the id it runs under.
//
// Both are read off the page rather than off its file name. A subagent's page is named for those
// two facts, so its name could be taken apart instead — but that would put the writer's naming rule
// in a second place, and a page whose name and content disagreed would then be answered under the
// name rather than dropped. `principalSeatName` and `agentId` are both required of a subagent, so a
// page short of either is not one this can key and is left out.
export function subagentPagesStanding(root: string): readonly SubagentPage[] {
  const found: SubagentPage[] = []
  for (const listed of everyOfType(root, SUBAGENT)) {
    const held = declaredAt(listed.path, root)
    if (held === null) continue
    const seat = textIn(held, PRINCIPAL_SEAT_NAME)
    const agentId = textIn(held, AGENT_ID)
    if (seat === null || agentId === null) continue
    const parts = agentId.indexOf(SUBAGENT_MARK)
    if (parts <= 0) continue
    const own = agentId.slice(parts + SUBAGENT_MARK.length)
    if (own === "") continue
    found.push({ seat, own, at: listed.path })
  }
  return found
}
