import { describe, expect, test } from "bun:test"
import { getMountainEveningDayStr, mtWallHm, mtWallToInstant } from "./mountain-times.ts"

/**
 * The two instants US Mountain changes offset at in 2026, worked out by hand from the rule this
 * file encodes: the second Sunday of March at 09:00 UTC, and the first Sunday of November at 08:00
 * UTC. In 2026 those Sundays are the 8th and the 1st.
 */
const SPRING_2026 = "2026-03-08T09:00:00Z"

const FALL_2026 = "2026-11-01T08:00:00Z"

describe("which offset Mountain stands at", () => {
  test("winter is seven behind and summer is six", () => {
    expect(mtWallHm(new Date("2026-01-15T12:00:00Z"))).toBe("05:00")
    expect(mtWallHm(new Date("2026-07-15T12:00:00Z"))).toBe("06:00")
  })

  test("spring forward is at 09:00 UTC, and 01:59 is followed by 03:00", () => {
    expect(mtWallHm(new Date("2026-03-08T08:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date(SPRING_2026))).toBe("03:00")
  })

  test("fall back is at 08:00 UTC, and 01:59 is followed by 01:00 again", () => {
    expect(mtWallHm(new Date("2026-11-01T07:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date(FALL_2026))).toBe("01:00")
  })

  test("the same rule holds in another year, so it is a rule and not a table", () => {
    expect(mtWallHm(new Date("2025-03-09T08:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date("2025-03-09T09:00:00Z"))).toBe("03:00")
    expect(mtWallHm(new Date("2025-11-02T07:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date("2025-11-02T08:00:00Z"))).toBe("01:00")
  })
})

describe("turning a Mountain wall time into an instant", () => {
  test("an ordinary day resolves at the offset that day stands at", () => {
    expect(mtWallToInstant("2026-01-15", 5, 0).toISOString()).toBe("2026-01-15T12:00:00.000Z")
    expect(mtWallToInstant("2026-07-15", 6, 0).toISOString()).toBe("2026-07-15T12:00:00.000Z")
  })

  /**
   * The two passes are what make the transition days come out right.
   *
   * The first pass guesses the offset from the wall reading treated as UTC, which is up to seven
   * hours away from the instant it will turn out to name. On a transition day that guess can land on
   * the wrong side of the change, so the second pass re-asks at the candidate instant and, when the
   * two disagree, believes the second.
   */
  test("across the spring gap, both sides of the change resolve at their own offset", () => {
    expect(mtWallToInstant("2026-03-08", 0, 0).toISOString()).toBe("2026-03-08T07:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 1, 0).toISOString()).toBe("2026-03-08T08:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 3, 0).toISOString()).toBe("2026-03-08T09:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 4, 0).toISOString()).toBe("2026-03-08T10:00:00.000Z")
  })

  /**
   * 02:00 on the spring-forward day is a wall reading that never happens, and it is answered with
   * the last instant before the gap rather than with a refusal. It therefore names the same instant
   * as 01:00, and two distinct readings collapse onto one.
   */
  test("a wall time in the gap that never happened answers as the hour before it", () => {
    expect(mtWallToInstant("2026-03-08", 2, 0).toISOString()).toBe("2026-03-08T08:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 2, 0).getTime()).toBe(
      mtWallToInstant("2026-03-08", 1, 0).getTime()
    )
  })

  /**
   * 01:00 to 01:59 on the fall-back day happens twice, and the first pass is the one chosen.
   */
  test("across the fall repeat, the hour that happens twice resolves to its first pass", () => {
    expect(mtWallToInstant("2026-11-01", 0, 0).toISOString()).toBe("2026-11-01T06:00:00.000Z")
    expect(mtWallToInstant("2026-11-01", 1, 0).toISOString()).toBe("2026-11-01T07:00:00.000Z")
    expect(mtWallToInstant("2026-11-01", 1, 59).toISOString()).toBe("2026-11-01T07:59:00.000Z")
    expect(mtWallToInstant("2026-11-01", 2, 0).toISOString()).toBe("2026-11-01T09:00:00.000Z")
    expect(mtWallToInstant("2026-11-01", 3, 0).toISOString()).toBe("2026-11-01T10:00:00.000Z")
  })

  test("a wall time turned into an instant reads back as the same wall time, off the gap", () => {
    for (const [day, hh] of [
      ["2026-03-08", 4],
      ["2026-11-01", 3],
      ["2026-06-01", 13],
    ] as const) {
      expect(mtWallHm(mtWallToInstant(day, hh, 30))).toBe(`${String(hh).padStart(2, "0")}:30`)
    }
  })

  // KNOWN DEFECT: a day string that is no date should be refused, rather than answered with an
  // Invalid Date that every reader downstream has to notice for itself.
  test("a day that is no date comes back as an Invalid Date and no refusal", () => {
    expect(mtWallToInstant("nope", 7, 0).getTime()).toBeNaN()
    expect(mtWallToInstant("", 7, 0).getTime()).toBeNaN()
  })

  // KNOWN DEFECT: a month or day out of range should be refused; rolling 2026-13-45 forward into
  // 2027-02-14 turns a typo into a plausible-looking instant three months away.
  test("a month or day past the end of the calendar rolls forward instead of refusing", () => {
    expect(mtWallToInstant("2026-13-45", 7, 0).toISOString()).toBe("2027-02-14T14:00:00.000Z")
    expect(mtWallToInstant("2026-02-30", 7, 0).toISOString()).toBe("2026-03-02T14:00:00.000Z")
  })
})

describe("the day an evening is counted into", () => {
  test("before 18:00 Mountain, the day is the calendar day it is", () => {
    expect(getMountainEveningDayStr(new Date("2026-03-05T23:59:00Z"))).toBe("2026-03-05")
    expect(getMountainEveningDayStr(new Date("2026-03-06T00:00:00Z"))).toBe("2026-03-05")
  })

  /**
   * From 18:00 Mountain the label runs a day ahead of the calendar. This is what makes a Sleep block
   * that starts in the evening belong to the day it will be woken into.
   */
  test("from 18:00 Mountain, the day is the next calendar day", () => {
    expect(getMountainEveningDayStr(new Date("2026-03-06T01:00:00Z"))).toBe("2026-03-06")
    expect(getMountainEveningDayStr(new Date("2026-03-06T04:00:00Z"))).toBe("2026-03-06")
  })

  test("the boundary is 18:00 exactly, which belongs to the next day", () => {
    expect(mtWallHm(new Date("2026-11-02T00:59:00Z"))).toBe("17:59")
    expect(getMountainEveningDayStr(new Date("2026-11-02T00:59:00Z"))).toBe("2026-11-01")
    expect(mtWallHm(new Date("2026-11-02T01:00:00Z"))).toBe("18:00")
    expect(getMountainEveningDayStr(new Date("2026-11-02T01:00:00Z"))).toBe("2026-11-02")
  })

  test("an evening at the end of a month or a year rolls to the day after it", () => {
    expect(getMountainEveningDayStr(new Date("2027-01-01T01:00:00Z"))).toBe("2027-01-01")
    expect(getMountainEveningDayStr(new Date("2026-04-01T01:00:00Z"))).toBe("2026-04-01")
  })
})
