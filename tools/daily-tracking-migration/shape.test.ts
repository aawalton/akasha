import { describe, expect, test } from "bun:test"
import { AKASHA, dayNameIn, dayOfName, MARKDOWN } from "../lib/tracking/day-place.ts"
import { SLUG_PREFIX } from "./shape.ts"

/**
 * The name the migration mints and the name every reader asks for are one name.
 *
 * `SLUG_PREFIX` in shape.ts is what `convert.ts` builds a landed day's slug out of, and it is the
 * only thing that decides what Alan's days are called once they have moved. `dayNameIn` in
 * tools/lib/tracking/day-place.ts is what every reader spells a day with when it goes looking for
 * one. Neither file imports the other, and until this test nothing made them agree — they agreed
 * because two people typed the same four characters, which is not a reason.
 *
 * A disagreement here says nothing when it happens. The migration would write days under one name
 * and every query would ask for another, and a query that asks for a name no page answers to comes
 * back empty rather than refusing: Alan's tiles would read zero on a day he tracked, and his points
 * would be summed from nothing. That is the whole reason this is worth a test rather than a
 * comment. The funnel audit cannot see it, because neither file both names a day page type and
 * reaches a store road, which is the join that audit is built on.
 *
 * Days are sampled rather than taken from the corpus so that this states the rule instead of
 * measuring today's data, and so it keeps saying the same thing after the corpus has moved.
 */
const DAYS: readonly string[] = ["2026-01-01", "2026-03-05", "2026-08-31", "2026-12-31"]

describe("the migration's slug and the funnel's day name", () => {
  test("an akasha day is minted and spelled the same way", () => {
    for (const day of DAYS) {
      expect(`${SLUG_PREFIX}${day}`).toBe(dayNameIn(AKASHA, day))
    }
  })

  test("a markdown day is named by its bare date, which is what convert.ts checks a source against", () => {
    for (const day of DAYS) {
      expect(dayNameIn(MARKDOWN, day)).toBe(day)
    }
  })

  test("the funnel takes back the day from the name the migration minted", () => {
    for (const day of DAYS) {
      expect(dayOfName(`${SLUG_PREFIX}${day}`)).toBe(day)
      expect(dayOfName(dayNameIn(AKASHA, day))).toBe(day)
      expect(dayOfName(dayNameIn(MARKDOWN, day))).toBe(day)
    }
  })

  test("the prefix is something, so a day name is not its bare date on both sides at once", () => {
    expect(SLUG_PREFIX).not.toBe("")
    for (const day of DAYS) {
      expect(dayNameIn(AKASHA, day)).not.toBe(dayNameIn(MARKDOWN, day))
    }
  })
})
