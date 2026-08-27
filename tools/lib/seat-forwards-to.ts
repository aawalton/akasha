import { pageTextOf } from "./seat-page-values.ts"

const KEY = "forwards-turns-to"

export interface ForwardsToRecord {
  readonly value: string
}

export function forwardsToOf(agent: string): ForwardsToRecord | null {
  const held = pageTextOf(agent, KEY)
  return held === null ? null : { value: held }
}
