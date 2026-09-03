import { describe, expect, test } from "bun:test"
import { getEsoDayStr } from "../eso-day.ts"
import { EXIT, exitCodeOf } from "../exit.ts"
import { mtWallHm } from "./mountain-times.ts"
import { esoDayOf, parseDayFlag, parseInstantFlag } from "./session-time.ts"

/** A fixed "now", so a test never depends on the day it happens to be run on. */
const NOW = new Date("2026-03-05T20:00:00Z")

function refusalOf(f: () => unknown): { code: number; message: string } {
  try {
    f()
  } catch (thrown) {
    return { code: exitCodeOf(thrown), message: (thrown as Error).message }
  }
  throw new Error("nothing was refused")
}

describe("the three shapes a time flag may take", () => {
  test("a bare HH:MM is a Mountain wall time on the eso day of now", () => {
    expect(getEsoDayStr(NOW)).toBe("2026-03-05")
    expect(parseInstantFlag("07:30", NOW).toISOString()).toBe("2026-03-05T14:30:00.000Z")
    expect(mtWallHm(parseInstantFlag("07:30", NOW))).toBe("07:30")
  })

  test("one digit of hour is enough, and the minutes must be two", () => {
    expect(parseInstantFlag("7:30", NOW).toISOString()).toBe("2026-03-05T14:30:00.000Z")
    expect(refusalOf(() => parseInstantFlag("7:3", NOW)).code).toBe(EXIT.INPUT)
  })

  test("a day and a time is a Mountain wall time on that day, with T or with a space", () => {
    expect(parseInstantFlag("2026-03-05 07:30", NOW).toISOString()).toBe("2026-03-05T14:30:00.000Z")
    expect(parseInstantFlag("2026-03-05T07:30", NOW).toISOString()).toBe("2026-03-05T14:30:00.000Z")
  })

  /**
   * Seconds are matched so that a pasted timestamp is accepted, and then thrown away.
   *
   * The instant that comes back is on the minute. This is how the reader can tell the wall shape ran
   * rather than `new Date`: `new Date` would have kept the 45 seconds, and would have read the whole
   * thing as UTC rather than as Mountain.
   */
  test("seconds are accepted and then silently discarded", () => {
    expect(parseInstantFlag("2026-03-05 07:30:45", NOW).toISOString()).toBe(
      "2026-03-05T14:30:00.000Z"
    )
    expect(parseInstantFlag("2026-03-05T07:30:59", NOW).toISOString()).toBe(
      "2026-03-05T14:30:00.000Z"
    )
  })

  test("a full timestamp with Z or an offset is read as the instant it names", () => {
    expect(parseInstantFlag("2026-03-05T07:30:00Z", NOW).toISOString()).toBe(
      "2026-03-05T07:30:00.000Z"
    )
    expect(parseInstantFlag("2026-03-05T07:30:00-07:00", NOW).toISOString()).toBe(
      "2026-03-05T14:30:00.000Z"
    )
    expect(parseInstantFlag("2026-03-05T07:30:00+0100", NOW).toISOString()).toBe(
      "2026-03-05T06:30:00.000Z"
    )
  })

  test("the flag is trimmed before any of the three shapes is tried", () => {
    expect(parseInstantFlag("  07:30  ", NOW).toISOString()).toBe("2026-03-05T14:30:00.000Z")
  })

  test("a whole day with no time is none of the three, and is refused", () => {
    expect(refusalOf(() => parseInstantFlag("2026-03-05", NOW)).message).toBe(
      'unrecognized time "2026-03-05" — use HH:MM, "YYYY-MM-DD HH:MM" (Mountain local), or full ISO with offset/Z'
    )
  })

  test("something of no shape at all is refused, and the sentence lists all three shapes", () => {
    const refusal = refusalOf(() => parseInstantFlag("later", NOW))
    expect(refusal.code).toBe(EXIT.INPUT)
    expect(refusal.message).toBe(
      'unrecognized time "later" — use HH:MM, "YYYY-MM-DD HH:MM" (Mountain local), or full ISO with offset/Z'
    )
  })

  test("something that ends like an offset but is no timestamp says so in its own words", () => {
    const refusal = refusalOf(() => parseInstantFlag("nope+01:00", NOW))
    expect(refusal.code).toBe(EXIT.INPUT)
    expect(refusal.message).toBe('invalid timestamp: "nope+01:00"')
  })

  test("the refusal quotes the flag as it was written, not as it was trimmed", () => {
    expect(refusalOf(() => parseInstantFlag("  later  ", NOW)).message).toContain('"  later  "')
  })
})

describe("what happens to an hour that is no hour", () => {
  /**
   * `99:99` matches the HH:MM shape, and only then meets the bound that says an hour is 0 to 23.
   * That bound is a zod schema inside `requireMatchPositional`, and a ZodError is not one of the
   * errors this CLI classifies, so it leaves as exit 70 — the code that means "an unhandled defect,
   * nothing established about what went wrong". The caller mistyped a time and is told the tool
   * broke.
   */
  // KNOWN DEFECT: an out-of-range hour or minute is a caller mistake and should refuse as input
  // error (exit 1) with a sentence naming the range, the way every other bad flag here does.
  test("99:99 is an unclassified failure rather than a refusal the caller can read", () => {
    const refusal = refusalOf(() => parseInstantFlag("99:99", NOW))
    expect(refusal.code).toBe(EXIT.UNCLASSIFIED)
    expect(refusal.code).toBe(70)
    expect(refusal.code).not.toBe(EXIT.INPUT)
    expect(refusal.message).toContain("Too big")
  })

  test("the same is true of 24:00 and of a day-and-time with a bad hour", () => {
    expect(refusalOf(() => parseInstantFlag("24:00", NOW)).code).toBe(EXIT.UNCLASSIFIED)
    expect(refusalOf(() => parseInstantFlag("2026-03-05 24:00", NOW)).code).toBe(EXIT.UNCLASSIFIED)
    expect(refusalOf(() => parseInstantFlag("07:60", NOW)).code).toBe(EXIT.UNCLASSIFIED)
  })

  test("23:59 is the last hour that is an hour", () => {
    expect(parseInstantFlag("23:59", NOW).toISOString()).toBe("2026-03-06T06:59:00.000Z")
  })
})

describe("a day flag", () => {
  test("a well-formed day is returned as it stands, trimmed", () => {
    expect(parseDayFlag("2026-03-05")).toBe("2026-03-05")
    expect(parseDayFlag("  2026-03-05  ")).toBe("2026-03-05")
  })

  test("anything of another shape is refused, and the sentence names the shape wanted", () => {
    const refusal = refusalOf(() => parseDayFlag("3/5/2026"))
    expect(refusal.code).toBe(EXIT.INPUT)
    expect(refusal.message).toBe('--day must be YYYY-MM-DD (got "3/5/2026")')
    expect(refusalOf(() => parseDayFlag("2026-3-5")).message).toBe(
      '--day must be YYYY-MM-DD (got "2026-3-5")'
    )
  })

  /**
   * The check is the shape and nothing else. There is no thirteenth month and no forty-fifth day,
   * and both are let through, to be rolled forward by `Date.UTC` wherever they are next used.
   */
  // KNOWN DEFECT: a day flag should name a day that exists, so 2026-13-45 refuses instead of
  // silently becoming 2027-02-14.
  test("a day that is no day passes, because only its shape is looked at", () => {
    expect(parseDayFlag("2026-13-45")).toBe("2026-13-45")
    expect(parseDayFlag("2026-02-30")).toBe("2026-02-30")
    expect(parseDayFlag("0000-00-00")).toBe("0000-00-00")
  })

  // KNOWN DEFECT: the same missing check inside the wall-time shape, where the rolled-forward day
  // becomes a real instant three months from the one the caller meant.
  test("the same hole is in the day-and-time shape, which lands three months away", () => {
    expect(parseInstantFlag("2026-13-45 07:00", NOW).toISOString()).toBe("2027-02-14T14:00:00.000Z")
  })
})

describe("the day an instant is counted into", () => {
  test("esoDayOf is the eso day, reset and all", () => {
    expect(esoDayOf(new Date("2026-03-05T10:59:00Z"))).toBe("2026-03-04")
    expect(esoDayOf(new Date("2026-03-05T11:00:00Z"))).toBe("2026-03-05")
    expect(esoDayOf(NOW)).toBe(getEsoDayStr(NOW))
  })
})

describe("the seam between the Mountain clock and the Eastern day", () => {
  /**
   * A bare `HH:MM` is a Mountain wall time, and the day it is anchored to is the Eastern eso day.
   *
   * Those two turn at different instants. The eso day turns at 06:00 Eastern, which is 04:00
   * Mountain, so between Mountain midnight and Mountain 04:00 the Mountain calendar has already
   * moved on while the eso day has not. A time typed in that window is anchored to yesterday.
   *
   * Below, "now" is 01:00 Mountain on 5 March. A caller typing the time on their own clock, 01:00,
   * asks for the instant they are standing in and is given one exactly twenty-four hours earlier.
   */
  // KNOWN DEFECT: a bare HH:MM should be anchored to the Mountain calendar day of `now`, the day the
  // caller is reading their clock in, so that typing the current time names the current instant.
  test("between Mountain midnight and 04:00, a bare HH:MM lands a day early", () => {
    const nowInTheWindow = new Date("2026-03-05T08:00:00Z")
    expect(mtWallHm(nowInTheWindow)).toBe("01:00")
    expect(getEsoDayStr(nowInTheWindow)).toBe("2026-03-04")

    const asked = parseInstantFlag("01:00", nowInTheWindow)
    expect(asked.toISOString()).toBe("2026-03-04T08:00:00.000Z")
    expect(nowInTheWindow.getTime() - asked.getTime()).toBe(24 * 3_600_000)
  })

  test("from 04:00 Mountain on, the two agree and a bare HH:MM lands where it reads", () => {
    const afterTheWindow = new Date("2026-03-05T11:00:00Z")
    expect(mtWallHm(afterTheWindow)).toBe("04:00")
    expect(getEsoDayStr(afterTheWindow)).toBe("2026-03-05")
    expect(parseInstantFlag("04:00", afterTheWindow).getTime()).toBe(afterTheWindow.getTime())
  })
})
