import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { akashaSeatRecordOf } from "./seat-akasha-read.ts"
import { dropBeside, keepBeside } from "./seat-beside.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

export interface SeatRecord {
  readonly value: string
  readonly at: number
}

export function seatRecordIn(stored: unknown): SeatRecord | null {
  if (stored === null || typeof stored !== "object" || Array.isArray(stored)) return null
  const { value, at } = stored as { value?: unknown; at?: unknown }
  if (typeof value !== "string" || value === "") return null
  if (typeof at !== "number" || !Number.isFinite(at)) return null
  return { value, at }
}

// BOTH SYSTEMS ARE READ, THE OLD ONE FIRST. The funnel writes what a seat observes to both, so
// for a seat standing in both they agree and the old store answers. What only akasha holds is a
// seat whose old page has gone: taking that page away orphans the sidecar beside it, and reaching
// the value only through that page is what left every seat in the fleet reading as though it had
// never carried a session at all.
//
// This order is the migration's, not a preference. The old store is what the fleet writes and
// stands on until the writers stop writing outside akasha; akasha is what survives the old page.
// When no writer writes outside akasha the first read has nothing left to answer and goes.
export function seatRecordOf(agent: string, key: string): SeatRecord | null {
  if (agent === "") return null
  const page = seatPageForAgent(agent)
  const held = page === null ? null : seatRecordIn(readUncommitted(page)?.[key])
  return held ?? akashaSeatRecordOf(agent, key)
}

export function keepSeatRecord(
  agent: string,
  key: string,
  value: string,
  at: number = Date.now()
): void {
  if (agent === "" || value === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  try {
    keepBeside(page, { [key]: { value, at } })
  } catch {
    return
  }
}

export function backfillSeatRecord(agent: string, key: string, held: string | null): void {
  if (held === null || held === "") return
  if (seatRecordOf(agent, key) !== null) return
  keepSeatRecord(agent, key, held)
}

export function dropSeatRecord(agent: string, key: string): void {
  if (agent === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  try {
    dropBeside(page, [key])
  } catch {
    return
  }
}
