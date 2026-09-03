export { greenDayPointsOf } from "@akasha/personas-core/green-day-fraction"
export { decideTotalPointsWrite } from "@akasha/personas-core/totals"

// Eight names were re-exported from here and read by nobody: `evaluateCoherenceRules`,
// `pathspecsForPrefix`, `pathspecsForPrefixes`, `resolvePointsPrefixes`, `GREEN_DAY_POINTS_FIELD`,
// `PERSONA_POINTS_SOURCE_COHERENCE_RULES`, `getEsoDayStrOffset` and `assertNever`. Each was a
// second name for something an akasha package already exports — the very shape the note below says
// hid six refusals for months.
//
// Counted two ways, neither of which could answer nobody by accident: across whole import clauses
// over every file importing this module, and again by searching `tools/` for each bare name, which
// over-reports rather than under-reports. Both answered nobody. A namespace import or a default
// import would hide a reader from the first count, so both were searched for under a seeded control
// that fired; neither exists. Whoever comes to need one of these names its package.

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

export { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"
// `readSessionPages` and `wakeWindow` were re-exported here so that `active-calories.ts` could read
// every session row and fold one day's window out of them. Both reached `readouts/session-readings.ts`,
// the last of this folder's reaches into the readout engine. That window is now taken from
// `@akasha/health-samples-day/active-calories`, which reads the entries beside a day's own page, so
// neither name has a caller and both are gone.
//
// `cardioReading` lost its only caller in the same change. It is left standing because deleting it
// leaves `akasha/status-bar-access` with no consumer at all, which is a call about that package
// rather than about this file.
export { cardioReading } from "@akasha/status-bar-access/session-reading"
export const SOURCE_POINTS_FIELD = "sourcePoints"

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
