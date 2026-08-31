import { existsSync, readFileSync, readdirSync } from "node:fs"
import { parse } from "yaml"
import { basename } from "node:path"
import { onceInCall } from "../../during-call/during-call.ts"
import { pageStemOf } from "../../page/name/name.ts"
import {
  dirOfPlaceHeld,
  dirsOfPlaces,
  relPathOfPlaced,
  SEAT_PLACES,
  SEAT_WRITE,
} from "./agent-page-place.ts"
import {
  akashaHolderProcessOf,
  akashaSeatPathForAgent,
  akashaSeatSlugOf,
} from "./seat-akasha-beside.ts"
import { parseSeatProcKey, type SeatPresence, statedProcessPresence } from "./seat-proc-key.ts"

const PAGE_SUFFIX = ".md"

const FRONTMATTER_FENCE = "---"

export function seatsDir(): string {
  return seatDirs().find((one) => existsSync(one)) ?? dirOfPlaceHeld(SEAT_WRITE)
}

const PAGE_TYPE = "seat"

function spellingsOf(seatName: string): readonly string[] {
  return [`${seatName}.${PAGE_TYPE}${PAGE_SUFFIX}`, `${seatName}${PAGE_SUFFIX}`]
}

export function seatPageAt(seatName: string): string | null {
  for (const dir of seatDirs()) {
    for (const name of spellingsOf(seatName)) {
      const at = `${dir}/${name}`
      if (existsSync(at)) return at
    }
  }
  return null
}

export function seatPageDestination(seatName: string): string {
  const held = seatPageAt(seatName)
  if (held !== null) return held
  return `${dirOfPlaceHeld(SEAT_WRITE)}/${seatName}.${PAGE_TYPE}${PAGE_SUFFIX}`
}

export function seatPageRel(seatName: string): string {
  const at = seatPageDestination(seatName)
  return relPathOfPlaced(at, SEAT_PLACES) ?? at
}

export function seatDirs(): readonly string[] {
  return dirsOfPlaces(SEAT_PLACES)
}

export function seatPagePaths(): readonly string[] {
  const found: string[] = []
  for (const dir of seatDirs()) {
    let entries: readonly string[]
    try {
      entries = readdirSync(dir)
    } catch {
      continue
    }
    for (const one of entries) if (one.endsWith(PAGE_SUFFIX)) found.push(`${dir}/${one}`)
  }
  return found
}

// EVERY PRESENCE DECISION IN THE FLEET STANDS ON THIS ONE READ, including the sweep's decision to
// take a page away. It takes an old page's path because what stands on it walks that directory, and
// it answers from akasha because that is where the value is kept.
//
// THE OLD SIDECAR IS NOT READ, and it must not be once nothing writes it. A sidecar nothing writes
// still names the process that held the seat when writing stopped, and that name does not read as
// stale — it reads as a definite absence, which is exactly what takes a page away. Reading the one
// store that is still written is what keeps this from deleting live seats.
//
// The page is opened for its id alone. A page stating no id, or one akasha carries no seat for, is
// answered as a holder that cannot be read rather than as one that is gone.
export function seatHolderProcess(pagePath: string): string | null {
  const id = frontmatterOf(pagePath)?.["id"]
  if (typeof id !== "string" || id === "") return null
  return akashaHolderProcessOf(id)
}

export function seatPresence(pagePath: string): SeatPresence {
  return statedProcessPresence(seatHolderProcess(pagePath))
}

export function seatIsPresent(pagePath: string): boolean {
  return seatPresence(pagePath) === "present"
}

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

function seatPageById(): ReadonlyMap<string, string> {
  return onceInCall("seat-page-by-id", () => {
    const found = new Map<string, string>()
    for (const page of seatPagePaths()) {
      const id = frontmatterOf(page)?.id
      if (typeof id === "string" && id !== "" && !found.has(id)) found.set(id, page)
    }
    return found
  })
}

export function seatPageAgents(): readonly string[] {
  return [...seatPageById().keys()].sort()
}

export function seatPageForAgent(agentId: string): string | null {
  return seatPageById().get(agentId) ?? null
}

export function seatIdForName(name: string): string | null {
  const page = seatPageAt(name)
  if (page === null) return null
  const held = frontmatterOf(page)?.id
  return typeof held === "string" && held !== "" ? held : null
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

export function seatNameForSupervisorPid(pid: number): string | null {
  for (const page of seatPagePaths()) {
    const stated = seatHolderProcess(page)
    if (stated === null) continue
    const key = parseSeatProcKey(stated)
    if (key !== null && key.pid === pid) return pageStemOf(page)
  }
  return null
}
