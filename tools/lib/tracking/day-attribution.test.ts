import { describe, expect, test } from "bun:test"
import { resolveAttributedDay } from "./day-attribution.ts"
import { getMountainEveningDayStr } from "./mountain-times.ts"
import { esoDayOf } from "./session-time.ts"
import { DAY_TURN_WORDS } from "./title-words.ts"

/** Late afternoon Mountain on 5 March, whose eso day is 2026-03-05. */
const START = new Date("2026-03-05T20:00:00Z")

/** The morning after, whose Mountain evening day is 2026-03-06. */
const FINISH = new Date("2026-03-06T14:00:00Z")

/** A day no rung would ever work out for itself, so a test can see which rung answered. */
const EXPLICIT = "1999-01-01"

const PREVIOUS = "2020-01-01"

function attributed(over: Partial<Parameters<typeof resolveAttributedDay>[0]>): string {
  return resolveAttributedDay({
    explicitDay: undefined,
    title: "Work",
    dayTurnWords: DAY_TURN_WORDS,
    finishInstant: FINISH,
    previousBlockDay: PREVIOUS,
    startInstant: START,
    ...over,
  })
}

describe("the four rungs a block's day is worked out on", () => {
  test("the days the rungs would each give are all different, so the tests can tell them apart", () => {
    expect(getMountainEveningDayStr(FINISH)).toBe("2026-03-06")
    expect(esoDayOf(START)).toBe("2026-03-05")
    expect(new Set([EXPLICIT, getMountainEveningDayStr(FINISH), PREVIOUS, esoDayOf(START)]).size).toBe(
      4
    )
  })

  test("first rung: a stated day wins over every other rung, including a Sleep block", () => {
    expect(attributed({ explicitDay: EXPLICIT })).toBe(EXPLICIT)
    expect(attributed({ explicitDay: EXPLICIT, title: "Sleep" })).toBe(EXPLICIT)
  })

  /**
   * Second rung: a Sleep block that has already finished is counted into the day it woke into.
   *
   * That is the evening rule, not the eso rule: `getMountainEveningDayStr` of the finish, so a sleep
   * that ends on the morning of the 6th is the 6th's, and a sleep that starts in the evening of the
   * 5th and ends the same evening would be the 6th's too.
   */
  test("second rung: a finished Sleep block takes the Mountain evening day of its finish", () => {
    expect(attributed({ title: "Sleep" })).toBe("2026-03-06")
    expect(attributed({ title: "Sleep", previousBlockDay: undefined })).toBe("2026-03-06")
    expect(attributed({ title: "Long sleep at last", previousBlockDay: undefined })).toBe(
      "2026-03-06"
    )
  })

  test("second rung: the title has to name a day-turn word by the whole-word rule", () => {
    expect(attributed({ title: "sleeping", previousBlockDay: undefined })).toBe("2026-03-05")
    expect(attributed({ title: "Rest", previousBlockDay: undefined })).toBe("2026-03-05")
    expect(attributed({ title: "Sleep", dayTurnWords: [], previousBlockDay: undefined })).toBe(
      "2026-03-05"
    )
  })

  /**
   * The second rung cannot be reached while a block is still open.
   *
   * A Sleep block is written when it starts, when there is no finish yet, so at the moment it is
   * created it falls past its own rung to the one below. Only a later amendment, once the finish is
   * known, could take the evening rung.
   */
  test("second rung: with no finish there is no evening day, so a Sleep block falls past it", () => {
    expect(attributed({ title: "Sleep", finishInstant: undefined })).toBe(PREVIOUS)
    expect(attributed({ title: "Sleep", finishInstant: undefined, previousBlockDay: undefined })).toBe(
      "2026-03-05"
    )
  })

  test("third rung: the day the block before it was counted into", () => {
    expect(attributed({})).toBe(PREVIOUS)
    expect(attributed({ finishInstant: undefined })).toBe(PREVIOUS)
  })

  test("fourth rung: with nothing before it, the eso day of the start", () => {
    expect(attributed({ previousBlockDay: undefined })).toBe("2026-03-05")
    expect(attributed({ previousBlockDay: undefined, startInstant: new Date("2026-03-05T10:59:00Z") })).toBe(
      "2026-03-04"
    )
  })

  /**
   * The fall-through is `??`, so only `undefined` falls through.
   *
   * An empty string is a day, as far as this ladder is concerned, and it stops the fall.
   */
  test("an empty previous day is a day and stops the fall, because only undefined falls", () => {
    expect(attributed({ previousBlockDay: "" })).toBe("")
    expect(attributed({ explicitDay: "" })).toBe("")
  })
})
