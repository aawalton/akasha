import { readFileSync } from "node:fs"
import {
  parseSeatProcKey,
  type SeatPresence,
  statedProcessPresence,
} from "@akasha/seat-system/seat-proc-key"
import { parse } from "yaml"
import {
  akashaHolderProcessOf,
  akashaSeatIdForName,
  akashaSeatPathForAgent,
  akashaSeatSlugOf,
  akashaSeatsThatExist,
} from "./seat-akasha-beside.ts"

const FRONTMATTER_FENCE = "---"

// WHAT STOOD HERE ADDRESSED A DIRECTORY THAT IS GONE. Every seat this walked, every path it spelled
// and every presence it decided from a page it opened is answered by akasha's index below, and the
// walk itself was the cost: a file opened for each seat to learn a set the index already holds.
//
// `frontmatterIn` and `frontmatterOf` stay and read no seat. They parse the frontmatter of a page
// in the old system, which the editor sweep still has pages of, and the seat history still has
// commits of.

export function frontmatterIn(raw: string): Record<string, unknown> | null {
  if (!raw.startsWith(`${FRONTMATTER_FENCE}\n`)) return null
  const close = raw.indexOf(`\n${FRONTMATTER_FENCE}`, FRONTMATTER_FENCE.length)
  if (close === -1) return null
  let parsed: unknown
  try {
    parsed = parse(raw.slice(FRONTMATTER_FENCE.length + 1, close + 1))
  } catch {
    return null
  }
  return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : null
}

export function frontmatterOf(pagePath: string): Record<string, unknown> | null {
  try {
    return frontmatterIn(readFileSync(pagePath, "utf8"))
  } catch {
    return null
  }
}

// EVERY AGENT AKASHA HOLDS A SEAT FOR. This listed the ids read out of the old pages' frontmatter,
// which meant a file opened for each seat to learn a set the index already answers.
export function seatPageAgents(): readonly string[] {
  return [...akashaSeatsThatExist().keys()].sort()
}

// WHO SITS IN THE SEAT OF THIS NAME, ANSWERED BY AKASHA. This found the old page by name and
// opened it for the id it states. Akasha files a seat under its name too, and the index reaches
// the id from that name without the page being read.
export function seatIdForName(name: string): string | null {
  return akashaSeatIdForName(name)
}

// The same answer as `seatHolderProcess`, for a caller holding an id rather than a path. Nothing
// here reads the old store any more; what still opens an old page opens it for its id or its name,
// and stops doing even that when the pages go.
export function agentHolderProcess(agentId: string): string | null {
  return akashaHolderProcessOf(agentId)
}

// A SEAT THAT DOES NOT STAND AND A SEAT WHOSE HOLDER CANNOT BE READ ARE DIFFERENT ANSWERS. No seat
// is an absence, and it is what lets a stopped agent be revived. A seat standing that names no
// readable process is uncertain, and delivering to it beats reviving over an agent that may be live.
// Collapsing the two would stop every revival, so the distinction is kept rather than inherited from
// what a null process happens to read as.
export function agentPresence(agentId: string): SeatPresence {
  if (akashaSeatPathForAgent(agentId) === null) return "absent"
  return statedProcessPresence(akashaHolderProcessOf(agentId))
}

export function agentIsPresent(agentId: string): boolean {
  return agentPresence(agentId) === "present"
}

// A SEAT'S NAME IS THE NAME ITS PAGE FILE STANDS UNDER, in either store, so this is read off the
// path in akasha the way it was read off the path here. The index answers that path already, and
// asking by id costs no walk of the old directory.
export function seatNameForAgent(agentId: string): string | null {
  if (agentId === "") return null
  return akashaSeatSlugOf(agentId)
}

// THE SEAT A PROCESS HOLDS, FOUND BY WALKING AKASHA. The holder was read from akasha already; what
// stood here was a walk of the old directory to learn which seats to ask after, and a page opened
// for each one to turn its path back into the id that asks. Akasha answers the name and the id
// together, so neither step is needed.
export function seatNameForSupervisorPid(pid: number): string | null {
  for (const [agentId, name] of akashaSeatsThatExist()) {
    const stated = akashaHolderProcessOf(agentId)
    if (stated === null) continue
    const key = parseSeatProcKey(stated)
    if (key !== null && key.pid === pid) return name
  }
  return null
}
