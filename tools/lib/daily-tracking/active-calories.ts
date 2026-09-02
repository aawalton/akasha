import { loadActiveCaloriesByDay } from "@akasha/health-samples-day/active-calories"
import { type WriteOutcome, writeActiveCalories } from "./write-daily-points.ts"

/**
 * One day's active calories, recomputed from the health samples and written onto the day.
 *
 * The window this counts over used to come from `wakeWindow`, which folded session rows through the
 * readout engine in `readouts/` and, on a day whose sleep was never recorded, guessed that Alan woke
 * at six in the morning New York time. That guess covered 94 of his 133 recorded days.
 *
 * It now comes from `@akasha/health-samples-day/active-calories`, the same reader
 * `health-total-points.ts` already used, so the figure is derived one way rather than two. That
 * reader refuses a day with no recorded wake instead of guessing one, and the refusal is carried
 * here the way `health-total-points.ts` carries it: the day comes back unmeasured and keeps whatever
 * `active-calories` its page already held, rather than being overwritten from a fabricated span.
 *
 * A day that refuses is named on stderr, because a run that measured fewer days than it was asked
 * for should say so rather than report a quieter answer as a fuller one.
 */
export async function rollupActiveCaloriesForDay(
  dayStr: string
): Promise<{ activeCalories: number | null; outcome: WriteOutcome | "unmeasured" }> {
  const read = await loadActiveCaloriesByDay({ dayStrs: [dayStr] })
  if (read.unread.length > 0) {
    process.stderr.write(`cardio: ${dayStr} has no recorded wake, so its span is not known\n`)
    return { activeCalories: null, outcome: "unmeasured" }
  }
  const activeCalories = read.byDay.get(dayStr) ?? null
  if (activeCalories === null) return { activeCalories: null, outcome: "unmeasured" }
  const outcome = await writeActiveCalories(dayStr, activeCalories)
  return { activeCalories, outcome }
}
