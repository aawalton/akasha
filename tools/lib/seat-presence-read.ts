import { existsSync, readFileSync, readdirSync } from "node:fs"
import { parse } from "yaml"
import { basename } from "node:path"
import { onceInCall } from "../../during-call/during-call.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import {
  dirOfPlaceHeld,
  dirsOfPlaces,
  relPathOfPlaced,
  SEAT_PLACES,
  SEAT_WRITE,
} from "./agent-page-place.ts"
import { parseSeatProcKey, type SeatPresence, statedProcessPresence } from "./seat-proc-key.ts"

const PAGE_SUFFIX = ".md"

const SUPERVISOR_PROCESS = "supervisor-process"

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

export function seatHolderProcess(pagePath: string): string | null {
  const stated = readUncommitted(pagePath)?.[SUPERVISOR_PROCESS]
  return typeof stated === "string" && stated !== "" ? stated : null
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

export function agentHolderProcess(agentId: string): string | null {
  const page = seatPageForAgent(agentId)
  return page === null ? null : seatHolderProcess(page)
}

export function agentPresence(agentId: string): SeatPresence {
  const page = seatPageForAgent(agentId)
  return page === null ? "absent" : seatPresence(page)
}

export function agentIsPresent(agentId: string): boolean {
  return agentPresence(agentId) === "present"
}

export function seatNameForAgent(agentId: string): string | null {
  if (agentId === "") return null
  const page = seatPageForAgent(agentId)
  return page === null ? null : pageStemOf(page)
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
