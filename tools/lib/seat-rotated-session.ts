import { pageTextOf } from "./seat-page-values.ts"
import { type SessionRecord, sessionRecordOf } from "./seat-session.ts"

const KEY = "rotated-session-uuid"

export function rotatedOf(agent: string): SessionRecord | null {
  return sessionRecordOf(pageTextOf(agent, KEY))
}
