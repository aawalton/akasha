export {
  pathspecsForPrefix,
  pathspecsForPrefixes,
  resolvePointsPrefixes,
} from "@akasha/personas-core/git-byte-pathspecs"
export { GREEN_DAY_POINTS_FIELD } from "@akasha/personas-core/green-day-fraction"
export { PERSONA_POINTS_SOURCE_COHERENCE_RULES } from "@akasha/personas-core/points-source-coherence"
export { decideTotalPointsWrite } from "@akasha/personas-core/totals"
export { evaluateCoherenceRules } from "@akasha/pages-core/schema/coherence-rules"
// `askNamed` and `patchPage` were re-exported here, and six files in this tier took them from
// this module rather than from the package. Both refuse permanently — a saved query is answered by
// a page engine that was removed, and a keyed write cannot become a file — and the re-export is
// why that went unseen: no search for `@shared/pages-query` named any of the six. Whoever needs
// the store now names the package at the call site, so the next such refusal is findable.
//
// `askComposed` was re-exported here too, from `@shared/pages-query/ask` — the remote half of the
// query facade, fixed at "the checkout is not here". The store it goes to answers that none of
// `session-tracking`, `daily-tracking`, `page-property-definition`, `food-entry`, `completed-task`,
// `to-do` or `persona-day` names a page type its index holds, so all five callers of it refused on
// every run, and the re-export hid that for the same reason it hid the six. It is gone: a caller
// asking about a day or a session asks the funnel in `lib/tracking/day-place.ts`, and a caller
// asking about anything else names the client it wants where it calls it.
import { getEsoDayStrOffset as esoDayStrOffset } from "@akasha/day/eso-day"

export { getEsoDayStr, getEsoDayStrOffset, getEsoDayWindow } from "@akasha/day/eso-day"
// `readSessionPages` came from `@akasha/status-bar-access/session-reading` beside `cardioReading`.
// That one binds the readout engine to a port that asks for a query by slug, and the engine which
// read those query files is gone, so it raised on every call. It now comes from `./session-pages.ts`,
// which states the query whole through the funnel. `cardioReading` reads health samples rather than
// pages and is unaffected.
export { cardioReading } from "@akasha/status-bar-access/session-reading"
export { readSessionPages } from "./session-pages.ts"
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
