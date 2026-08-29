import { pageTextOf } from "./seat-page-values.ts"
import { keepSeatRecord, seatRecordOf } from "./seat-record.ts"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const SESSION_KEY = "claude-code-session-uuid"

const KEY = SESSION_KEY

export interface SessionRecord {
  readonly value: string
}

export function sessionOf(agent: string): SessionRecord | null {
  const kept = seatRecordOf(agent, KEY)
  if (kept !== null && UUID.test(kept.value)) return { value: kept.value }
  const held = pageTextOf(agent, KEY)
  return held !== null && UUID.test(held) ? { value: held } : null
}

export function keepSession(agent: string, value: string, at?: number): void {
  if (!UUID.test(value)) return
  keepSeatRecord(agent, KEY, value, at)
}

export function sessionRecordOf(value: string | null): SessionRecord | null {
  return value !== null && UUID.test(value) ? { value } : null
}
