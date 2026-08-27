
import { pageTextOf } from "./seat-page-values.ts"

const KEY = "errand"

const CEILING = 1000

const SHOWN = 60

export interface ErrandRecord {
  readonly value: string
}

export function clipErrand(said: string): string {
  const tidied = said.trim()
  return tidied.length <= CEILING ? tidied : `${tidied.slice(0, CEILING)}\u2026`
}

export function errandOf(agent: string): ErrandRecord | null {
  const held = pageTextOf(agent, KEY)
  return held === null ? null : { value: held }
}

export function errandLine(record: ErrandRecord | null): string {
  if (record === null) return `  ${KEY.padEnd(8)} \u2014 none stated`
  const flat = record.value.replace(/\s+/g, " ").trim()
  const said = flat.length <= SHOWN ? flat : `${flat.slice(0, SHOWN)}\u2026`
  return `  ${KEY.padEnd(8)} ${said}`
}
