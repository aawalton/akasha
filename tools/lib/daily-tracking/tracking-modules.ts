export {
  pathspecsForPrefix,
  pathspecsForPrefixes,
  resolvePointsPrefixes,
} from "@akasha/personas-core/git-byte-pathspecs"
export { GREEN_DAY_POINTS_FIELD } from "@akasha/personas-core/green-day-fraction"
export { PERSONA_POINTS_SOURCE_COHERENCE_RULES } from "@akasha/personas-core/points-source-coherence"
export { decideTotalPointsWrite } from "@akasha/personas-core/totals"
export { evaluateCoherenceRules } from "@akasha/pages-core/schema/coherence-rules"
export { askNamed, patchPage } from "@shared/pages-query"
export { askComposed } from "@shared/pages-query/ask"
import { getEsoDayStrOffset as esoDayStrOffset } from "@akasha/day/eso-day"

export { getEsoDayStr, getEsoDayStrOffset, getEsoDayWindow } from "@akasha/day/eso-day"
export { cardioReading, readSessionPages } from "@akasha/status-bar-access/session-reading"
export { assertNever } from "@akasha/utils-narrow/assert-never"
export const SOURCE_POINTS_FIELD = "sourcePoints"
export { DEFAULT_GREEN_DAY_POINTS } from "../../../readouts/ring/ladder/ladder.ts"
export { wakeWindow } from "../../../readouts/session-readings.ts"

export const WRITER = "daily-tracking"

/**
 * How many days back the daily-tracking engine reaches. Every rollup recomputes a day from
 * that day's own window, so this is the span a run can still restate. A day older than this
 * is settled: nothing recomputes it, and nothing may rewrite it either.
 */
export const TRACKING_SCAN_DAYS = 14

/** The offsets the scan walks, oldest first: -13 .. 0 for a fourteen day window. */
export const TRACKING_SCAN_DAY_OFFSETS: readonly number[] = Array.from(
  { length: TRACKING_SCAN_DAYS },
  (_, index) => index - (TRACKING_SCAN_DAYS - 1)
)

/**
 * The oldest day a run is allowed to touch. Days before this are history rather than
 * working state, and are compared against rather than written to.
 */
export function trackingScanFloorDayStr(now: Date): string {
  return esoDayStrOffset(now, -(TRACKING_SCAN_DAYS - 1))
}

export function kebabKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function numberOf(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function textOf(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined
}
