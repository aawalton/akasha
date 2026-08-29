import { pageTextOf } from "./seat-page-values.ts"
import { dropSeatRecord, keepSeatRecord, seatRecordOf } from "./seat-record.ts"
import { type SessionRecord, sessionRecordOf } from "./seat-session.ts"

export const ROTATED_KEY = "rotated-session-uuid"

const KEY = ROTATED_KEY

export function rotatedOf(agent: string): SessionRecord | null {
  const kept = seatRecordOf(agent, KEY)
  const stood = kept === null ? null : sessionRecordOf(kept.value)
  return stood ?? sessionRecordOf(pageTextOf(agent, KEY))
}

export function keepRotated(agent: string, value: string, at?: number): void {
  if (sessionRecordOf(value) === null) return
  keepSeatRecord(agent, KEY, value, at)
}

export function clearRotated(agent: string): void {
  dropSeatRecord(agent, KEY)
}
