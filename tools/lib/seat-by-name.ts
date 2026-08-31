import {
  akashaSeatIdForName,
  akashaValueOf,
  SUPERVISOR_PROCESS,
} from "./seat-akasha-beside.ts"
import { frontmatterOf, seatPagePaths, seatPresence } from "./seat-presence-read.ts"
import { type SeatPresence, statedProcessPresence } from "./seat-proc-key.ts"

const TITLE = "title"

const ID = "id"

export interface SeatByName {
  readonly id: string
  readonly name: string
  readonly presence: SeatPresence
}

function textAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

// A seat's title was only ever its slug spelled again, and in akasha that slug is the name its page
// file stands under. So the walk of the old pages answers first, and what akasha answers for is the
// seat whose old page has gone — which used to be no seat by that name at all.
export function seatByName(name: string): SeatByName | null {
  for (const page of seatPagePaths()) {
    const frontmatter = frontmatterOf(page)
    if (frontmatter === null || textAt(frontmatter, TITLE) !== name) continue
    return { id: textAt(frontmatter, ID) ?? "", name, presence: seatPresence(page) }
  }
  const id = akashaSeatIdForName(name)
  if (id === null) return null
  const held = akashaValueOf(id, SUPERVISOR_PROCESS)
  return {
    id,
    name,
    presence: statedProcessPresence(typeof held === "string" && held !== "" ? held : null),
  }
}
