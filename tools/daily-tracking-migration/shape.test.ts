import { describe, expect, test } from "bun:test"
import {
  AKASHA,
  dayNameIn,
  dayOfName,
  MARKDOWN,
} from "../../akasha/alan/tracking/daily/day-place/day-place.module.code.ts"

/**
 * A day's name goes out and comes back, and the two stores never spell one day alike.
 *
 * This began as a guard that the migration's own prefix agreed with the name every reader asks
 * for. That prefix is gone: `convert.ts` was deleted once all 133 days had moved, and
 * `SLUG_PREFIX` went with it, so there is no second speller left to disagree with. What the
 * guard was for has been met by removing the thing it guarded against.
 *
 * What is still worth holding is the funnel's own arithmetic. `dayNameIn` spells a day for a
 * store and `dayOfName` takes the day back out of the name. A break in that pair says nothing
 * when it happens: a query for a name no page answers to comes back empty rather than refusing,
 * so Alan's tiles would read zero on a day he tracked and his points would be summed from
 * nothing. That silence is why this is a test rather than a comment.
 *
 * Days are sampled rather than taken from the corpus, so this states the rule instead of
 * measuring today's data, and keeps saying the same thing after the corpus has moved again.
 */
const DAYS: readonly string[] = ["2026-01-01", "2026-03-05", "2026-08-31", "2026-12-31"]

describe("the funnel's day names", () => {
  test("a markdown day is named by its bare date", () => {
    for (const day of DAYS) {
      expect(dayNameIn(MARKDOWN, day)).toBe(day)
    }
  })

  test("the funnel takes back the day from the name it spelled", () => {
    for (const day of DAYS) {
      expect(dayOfName(dayNameIn(AKASHA, day))).toBe(day)
      expect(dayOfName(dayNameIn(MARKDOWN, day))).toBe(day)
    }
  })

  test("the two stores never spell one day alike", () => {
    for (const day of DAYS) {
      expect(dayNameIn(AKASHA, day)).not.toBe(dayNameIn(MARKDOWN, day))
    }
  })
})
