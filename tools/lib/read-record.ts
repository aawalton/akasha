
import {
  bodyItself,
  countLines,
  type Entry,
  loadPath,
  type Reading,
  type Records,
  sameBody,
} from "../../agent/read-record.ts"
import {
  carriedReading,
  type Moved,
  recordPathFor,
  recordRead as landRead,
  recordsFor,
  resetReadings as resetTo,
} from "../../agent/record-read.ts"
import { agentPagePathFor } from "./agent-page.ts"
import { replacedAt } from "./epoch.ts"
import { SUBAGENT_MARK } from "./subagent.ts"

export { bodyItself, carriedReading, countLines, loadPath, sameBody }
export type { Entry, Moved, Reading, Records }

export const DEFAULT_READ_LIMIT = 2000

export const READINGS = "readings"

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

function held(agent: string): Records {
  const page = agentPagePathFor(agent)
  return page === null ? {} : recordsFor(page, replacedAt(agent))
}

export function recordRead(
  agent: string,
  absolutePath: string,
  seenAt: number,
  oid: string
): void {
  const page = agentPagePathFor(agent)
  if (page === null) return
  landRead(page, replacedAt(agent), absolutePath, seenAt, oid)
}

export function resetReadings(agent: string, cutoff: number): void {
  const page = agentPagePathFor(agent)
  if (page === null) return
  resetTo(page, cutoff)
}

export function readingsOf(agent: string): Records {
  return held(agent)
}

export function ownRead(agent: string, absolutePath: string): Reading | null {
  const entry = held(agent)[absolutePath]
  if (entry === undefined) return null
  return {
    oid: entry.oid,
    seenAt: entry.seenAt,
    mechanicalOid: entry.mechanicalOid ?? null,
  }
}

export function readOid(agent: string, absolutePath: string): string | null {
  const entry = held(agent)[absolutePath]
  return entry === undefined ? null : entry.oid
}
