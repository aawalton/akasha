import { answer } from "./page-query.ts"
import { type Values } from "./page-file-values.ts"
import { textOf } from "./page-query-values.ts"
import { resolveRoots } from "../../repo/roots/roots"

const NONE = "none"

const PAGE_TYPE = "seat-conditions"

export interface SeatConditions {
  readonly model: string | null
  readonly subagentModel: string | null
  readonly fallbackModel: string | null
  readonly autoCompactWindow: string | null
  readonly effortLevel: string | null
  readonly subagentSpawnDepth: string | null
  readonly toolTimeout: string | null
  readonly resumeThresholdMinutes: string | null
  readonly resumeTokenThreshold: string | null
  readonly extendedContextAvailable: boolean
}

function stated(values: Values, key: string): string | null {
  const held = textOf(values, key)
  if (held === null || held.trim() === "" || held === NONE) return null
  return held
}

// A flag a seat runs under. Absent reads as false, the property defaulting so rather than
// this deciding it.
function flagged(values: Values, key: string): boolean {
  return textOf(values, key) === "true"
}

export function readSeatConditions(): SeatConditions {
  const found = answer(resolveRoots(), { pageType: PAGE_TYPE })
  if (found === null) {
    throw new Error(`\`${PAGE_TYPE}\` ${"names no page type whose pages are files"}`)
  }
  const [row, second] = found.rows
  if (row === undefined) {
    throw new Error(`no \`${PAGE_TYPE}\` page stands, so nothing states what a seat runs under`)
  }
  if (second !== undefined) {
    throw new Error(`${found.n} \`${PAGE_TYPE}\` pages stand where one carries them, so none of them holds`)
  }
  return {
    model: stated(row.values, "model"),
    subagentModel: stated(row.values, "subagent-model"),
    fallbackModel: stated(row.values, "fallback-model"),
    autoCompactWindow: stated(row.values, "auto-compact-window"),
    effortLevel: stated(row.values, "effort-level"),
    subagentSpawnDepth: stated(row.values, "subagent-spawn-depth"),
    toolTimeout: stated(row.values, "tool-timeout"),
    resumeThresholdMinutes: stated(row.values, "resume-threshold-minutes"),
    resumeTokenThreshold: stated(row.values, "resume-token-threshold"),
    extendedContextAvailable: flagged(row.values, "extended-context-available"),
  }
}
