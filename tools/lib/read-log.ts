
import { existsSync, readdirSync } from "node:fs"
import {
  coveredTo,
  type Entry,
  loadPath,
  type Reading,
  type Records,
  type Span,
} from "../../agent/read-log.ts"
import {
  carriedReading,
  carryReadings as carryOver,
  flushReadings,
  type Moved,
  recordPathFor,
  recordRead as landRead,
  recordsFor,
  resetReadings as resetTo,
} from "../../agent/record-read.ts"
import { agentPagePathFor } from "./agent-page.ts"
import { dirsOfPlaces, SEAT_PLACES, SUBAGENT_PLACES } from "./agent-page-place.ts"
import { replacedAt } from "./epoch.ts"
import { SUBAGENT_MARK } from "./subagent.ts"

export { carriedReading, flushReadings, loadPath }
export type { Entry, Moved, Reading, Records, Span }

export const DEFAULT_READ_LIMIT = 2000

export const READINGS = "readings"

const PAGE_SUFFIX = ".md"

function identifier(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null
}

export function seatId(): string | null {
  return identifier(process.env.AGENT_ID) ?? identifier(process.env.CLAUDE_CODE_SESSION_ID)
}

export function agentId(): string | null {
  const seat = seatId()
  if (seat === null) return null
  const acting = identifier(process.env.ACTING_AGENT_ID)
  return acting !== null && acting.startsWith(`${seat}${SUBAGENT_MARK}`) ? acting : seat
}

export function hookAgentId(payload: Record<string, unknown>): string | null {
  return seatId() ?? identifier(payload.session_id)
}

export function recordingAgentId(payload: Record<string, unknown>): string | null {
  const seat = hookAgentId(payload)
  if (seat === null) return null
  const subagent = identifier(payload.agent_id)
  return subagent === null ? seat : `${seat}${SUBAGENT_MARK}${subagent}`
}

export function pathFor(agent: string): string | null {
  const page = agentPagePathFor(agent)
  return page === null ? null : recordPathFor(page)
}

export function recordStands(agent: string): boolean {
  return agentPagePathFor(agent) !== null
}

export function recordSaid(agent: string): string {
  return pathFor(agent) ?? "no page carries a read record for this agent"
}

export function countLines(text: string): number {
  if (text === "") return 0
  const parts = text.split("\n")
  return parts[parts.length - 1] === "" ? parts.length - 1 : parts.length
}

function held(agent: string): Records {
  const page = agentPagePathFor(agent)
  return page === null ? {} : recordsFor(page, replacedAt(agent))
}

export function recordRead(
  agent: string,
  absolutePath: string,
  at: number,
  span: Span,
  blob?: string
): void {
  const page = agentPagePathFor(agent)
  if (page === null) return
  landRead(page, replacedAt(agent), absolutePath, at, span, blob)
}

export function resetReadings(agent: string, cutoff: number): void {
  const page = agentPagePathFor(agent)
  if (page === null) return
  resetTo(page, cutoff)
}

function agentPages(): readonly string[] {
  const found: string[] = []
  for (const dir of dirsOfPlaces([...SEAT_PLACES, ...SUBAGENT_PLACES])) {
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) if (name.endsWith(PAGE_SUFFIX)) found.push(`${dir}/${name}`)
  }
  return found
}

export function carryReadings(moves: readonly Moved[]): number {
  return carryOver(moves, agentPages())
}

export function bodyItself(reading: Reading | null, mark: string): boolean {
  return reading !== null && reading.blob === mark
}

export function sameBody(reading: Reading | null, mark: string): boolean {
  return bodyItself(reading, mark) || (reading !== null && reading.mechanical === mark)
}

export function readingsOf(agent: string): Records {
  return held(agent)
}

export function ownRead(agent: string, absolutePath: string): Reading | null {
  const entry = held(agent)[absolutePath]
  if (entry === undefined) return null
  return {
    at: entry.at,
    spans: entry.spans,
    blob: entry.blob ?? null,
    mechanical: entry.mechanical ?? null,
  }
}

export function lastReadAt(agent: string, absolutePath: string): number | null {
  const entry = held(agent)[absolutePath]
  return entry === undefined ? null : entry.at
}

export function firstUnreadLine(
  agent: string,
  absolutePath: string,
  mark: string,
  lines: number
): number | null {
  if (lines === 0) return null
  const entry = held(agent)[absolutePath]
  if (entry === undefined) return 1
  if (entry.blob !== mark && entry.mechanical !== mark) return 1
  const covered = coveredTo(entry.spans)
  return covered >= lines ? null : covered + 1
}
