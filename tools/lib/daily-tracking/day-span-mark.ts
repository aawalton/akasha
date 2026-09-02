import { spannedFromDayBoundary } from "@akasha/health-samples-day/wake-day-window"
import { dayByDate, landDayPage } from "../tracking/day-place.ts"

/**
 * The one place that answers how a day's span was reached.
 *
 * Three implementations work out the span Alan's readings are counted over — the akasha module
 * `wake-day-window`, `tools/lib/wake-day.ts` and `readouts/session-readings.ts` — and two rollups
 * each pick one. All three fall back to the same thing when the day recorded no sleep ending inside
 * it: the ESO day boundary, six in the morning in New York. So the question "was this day spanned
 * from the boundary?" has one answer for both rollups, and it is asked here rather than at each
 * figure's writer. Asked twice, once per rollup, the two would drift the moment one of the three
 * implementations changed, and one of them would start labelling a day wrong.
 *
 * The akasha module is what answers it, because it is the only one of the three that refuses rather
 * than guessing, and a refusal is exactly the fact this records.
 */
export function spannedOn(dayStr: string): boolean {
  return spannedFromDayBoundary(dayStr)
}

/** The key a day carries this under, spelled as the store spells a day's keys. */
export const SPANNED_KEY = "spanned-from-day-boundary"

export type SpanMarkOutcome = "marked" | "unfiled"

export interface SpanMark {
  readonly dayStr: string
  readonly spanned: boolean
  readonly outcome: SpanMarkOutcome
}

/**
 * One day told whether its span was reached from a recorded wake or from the day boundary.
 *
 * This writes no figure. Every reading on the day was already computed and landed by the rollups
 * around it, and this states nothing about whether any of them is right — a day spanned from the
 * boundary usually holds figures that are right anyway, because the boundary and the wake are often
 * close and because most of what is summed over a span does not sit near either end of it. What the
 * flag says is only that the span was not read off a wake Alan recorded.
 *
 * It is written on every day, true or false. A property that only appeared when true would read as
 * absent-because-nobody-looked on the days it is false, which is the fault this was built to end.
 *
 * A day with no page yet is left alone rather than created: this labels how a day was spanned, and a
 * day nothing has measured has no span to label. The rollups create the page, so the day is marked
 * on the next pass.
 */
export async function markDaySpan(dayStr: string, writer: string): Promise<SpanMark> {
  const spanned = spannedOn(dayStr)
  const held = await dayByDate(dayStr)
  if (held === null || held.id === "") return { dayStr, spanned, outcome: "unfiled" }
  const landed = await landDayPage("patch", dayStr, { [SPANNED_KEY]: spanned }, writer)
  if (!landed.ok) {
    throw new Error(`how ${dayStr} was spanned did not land on its page: ${landed.why}`)
  }
  return { dayStr, spanned, outcome: "marked" }
}
