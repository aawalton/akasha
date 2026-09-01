import { describe, expect, test } from "bun:test"
import { planRescore } from "./points-source-rescore.ts"
import { TRACKING_SCAN_DAYS, trackingScanFloorDayStr } from "./tracking-modules.ts"

const FLOOR = "2026-08-18"

function day(date: string, bar: number | null): Record<string, unknown> {
  return bar === null ? { date } : { date, "green-day-points": bar }
}

describe("planRescore", () => {
  test("restates a day inside the window whose stored bar drifted", () => {
    const rows = [day("2026-08-20", 10000), day("2026-08-21", 60)]
    const { drifted, settled } = planRescore(rows, "eppie", 60, FLOOR)
    expect(drifted.map((d) => d.dayStr)).toEqual(["2026-08-20"])
    expect(drifted[0]?.storedBar).toBe(10000)
    expect(drifted[0]?.newBar).toBe(60)
    expect(settled).toBe(0)
  })

  test("leaves a day before the floor standing, however far its bar has drifted", () => {
    const rows = [day("2026-06-25", 8), day("2026-08-01", 8), day("2026-08-20", 8)]
    const { drifted, settled } = planRescore(rows, "eppie", 60, FLOOR)
    expect(drifted.map((d) => d.dayStr)).toEqual(["2026-08-20"])
    expect(settled).toBe(2)
  })

  test("the day on the floor itself is inside the window", () => {
    const { drifted } = planRescore([day(FLOOR, 1)], "eppie", 60, FLOOR)
    expect(drifted.map((d) => d.dayStr)).toEqual([FLOOR])
  })

  test("a bar that changed for a reason does not rewrite the history judged under the old one", () => {
    // The hazard this floor closes: every day a persona ever had, restated to today's bar.
    const rows = [
      day("2026-06-25", 8),
      day("2026-07-28", 8),
      day("2026-08-16", 8),
      day("2026-08-19", 8),
      day("2026-08-31", 8),
    ]
    const { drifted, settled } = planRescore(rows, "eppie", 60, FLOOR)
    expect(drifted.map((d) => d.dayStr)).toEqual(["2026-08-19", "2026-08-31"])
    expect(settled).toBe(3)
  })

  test("the floor is a bound rather than a silence — the whole window stays reachable", () => {
    const rows = ["2026-08-18", "2026-08-24", "2026-08-31"].map((d) => day(d, 10000))
    const { drifted } = planRescore(rows, "eppie", 60, FLOOR)
    expect(drifted).toHaveLength(3)
  })

  test("a day already carrying the current bar is left alone", () => {
    const { drifted, settled } = planRescore([day("2026-08-20", 60)], "eppie", 60, FLOOR)
    expect(drifted).toHaveLength(0)
    expect(settled).toBe(0)
  })

  test("a row with no date is skipped rather than guessed at", () => {
    const { drifted, settled } = planRescore([{ "green-day-points": 10000 }], "eppie", 60, FLOOR)
    expect(drifted).toHaveLength(0)
    expect(settled).toBe(0)
  })

  test("a day carrying no bar at all is drift inside the window", () => {
    const { drifted } = planRescore([day("2026-08-20", null)], "eppie", 60, FLOOR)
    expect(drifted[0]?.storedBar).toBeNull()
  })

  test("drifted days come back oldest first", () => {
    const rows = ["2026-08-31", "2026-08-20", "2026-08-25"].map((d) => day(d, 1))
    const { drifted } = planRescore(rows, "eppie", 60, FLOOR)
    expect(drifted.map((d) => d.dayStr)).toEqual(["2026-08-20", "2026-08-25", "2026-08-31"])
  })
})

describe("trackingScanFloorDayStr", () => {
  test("the floor is the oldest day of the same fourteen day window the scan walks", () => {
    expect(TRACKING_SCAN_DAYS).toBe(14)
    // 2026-09-01T08:35Z fell on eso day 2026-08-31, whose window opens 2026-08-18 —
    // exactly the span the default-bar defect reached.
    expect(trackingScanFloorDayStr(new Date("2026-09-01T08:35:00Z"))).toBe("2026-08-18")
  })
})
