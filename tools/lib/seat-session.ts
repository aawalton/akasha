import { pageTextOf } from "./seat-page-values.ts"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const KEY = "claude-code-session-uuid"

export interface SessionRecord {
  readonly value: string
}

export function sessionOf(agent: string): SessionRecord | null {
  const held = pageTextOf(agent, KEY)
  return held !== null && UUID.test(held) ? { value: held } : null
}

export function sessionRecordOf(value: string | null): SessionRecord | null {
  return value !== null && UUID.test(value) ? { value } : null
}
