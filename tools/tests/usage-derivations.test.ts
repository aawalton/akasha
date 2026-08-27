import { describe, expect, it } from "bun:test"
import {
  computePacingDerivations,
  effectiveSessionUtilization,
  elapsedFraction,
  formatPaceHours,
  hoursRemaining,
  paceHoursDiff,
  sundayOverlapMs,
} from "../lib/usage-derivations.ts"

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

const SUN_MAY_3_NOON = Date.UTC(2026, 4, 3, 12, 0, 0)
const MON_MAY_4_MIDNIGHT = Date.UTC(2026, 4, 4, 0, 0, 0)
const MON_MAY_4_NOON = Date.UTC(2026, 4, 4, 12, 0, 0)
const MON_MAY_4_1800 = Date.UTC(2026, 4, 4, 18, 0, 0)
const TUE_MAY_5_NOON = Date.UTC(2026, 4, 5, 12, 0, 0)
const WED_APR_29_1800 = Date.UTC(2026, 3, 29, 18, 0, 0)
const WED_MAY_6_1800 = Date.UTC(2026, 4, 6, 18, 0, 0)
const FRI_MAY_8_1800 = Date.UTC(2026, 4, 8, 18, 0, 0)
const WED_MAY_13_1800 = Date.UTC(2026, 4, 13, 18, 0, 0)
const SUN_MAY_3_1800 = Date.UTC(2026, 4, 3, 18, 0, 0)
const SUN_MAY_10_1800 = Date.UTC(2026, 4, 10, 18, 0, 0)
const MON_MAY_11_MIDNIGHT = Date.UTC(2026, 4, 11, 0, 0, 0)
const SUN_MAY_10_NOON = Date.UTC(2026, 4, 10, 12, 0, 0)

const isoOf = (ms: number): string => new Date(ms).toISOString()

describe("sundayOverlapMs", () => {
  it("returns 0 for an interval containing no Sunday", () => {
    const start = MON_MAY_4_MIDNIGHT
    const end = Date.UTC(2026, 4, 9, 0, 0, 0)
    expect(sundayOverlapMs(start, end)).toBe(0)
  })

  it("returns 24h for a 7-day window aligned on Mon midnight", () => {
    expect(sundayOverlapMs(MON_MAY_4_MIDNIGHT, MON_MAY_11_MIDNIGHT)).toBe(DAY)
  })

  it("returns 24h split across two calendar Sundays for a Sun-anchored 7d window", () => {
    expect(sundayOverlapMs(SUN_MAY_3_1800, SUN_MAY_10_1800)).toBe(DAY)
  })

  it("returns the partial overlap when the interval ends mid-Sunday", () => {
    expect(sundayOverlapMs(WED_APR_29_1800, SUN_MAY_3_NOON)).toBe(12 * HOUR)
  })

  it("returns 0 for an empty or reversed interval", () => {
    expect(sundayOverlapMs(MON_MAY_4_MIDNIGHT, MON_MAY_4_MIDNIGHT)).toBe(0)
    expect(sundayOverlapMs(MON_MAY_4_NOON, MON_MAY_4_MIDNIGHT)).toBe(0)
  })
})

describe("elapsedFraction (ESO-reset day-tick, UTC Sunday excluded)", () => {
  it("subtracts a fully-elapsed Sunday from the numerator", () => {
    const f = elapsedFraction({
      now: MON_MAY_4_1800,
      sevenDayResetsAt: isoOf(WED_MAY_6_1800),
    })
    expect(f).toBeCloseTo(112 / 144, 6)
  })

  it("does not subtract Sunday hours that haven't elapsed yet", () => {
    const f = elapsedFraction({
      now: WED_APR_29_1800,
      sevenDayResetsAt: isoOf(WED_MAY_6_1800),
    })
    expect(f).toBeCloseTo(16 / 144, 6)
  })

  it("steps at the ESO reset (10:00 UTC during EDT), not at noon-UTC", () => {
    const reset = isoOf(Date.UTC(2026, 4, 20, 18, 0, 0))
    const before = elapsedFraction({
      now: Date.UTC(2026, 4, 15, 9, 30, 0),
      sevenDayResetsAt: reset,
    })
    const after = elapsedFraction({
      now: Date.UTC(2026, 4, 15, 10, 30, 0),
      sevenDayResetsAt: reset,
    })
    expect(before).toBeCloseTo(40 / 144, 6)
    expect(after).toBeCloseTo(64 / 144, 6)
    expect(after).not.toBe(before)
  })

  it("steps at the ESO reset (11:00 UTC during EST), not at noon-UTC", () => {
    const reset = isoOf(Date.UTC(2026, 0, 20, 18, 0, 0))
    const before = elapsedFraction({
      now: Date.UTC(2026, 0, 15, 10, 30, 0),
      sevenDayResetsAt: reset,
    })
    const after = elapsedFraction({
      now: Date.UTC(2026, 0, 15, 11, 30, 0),
      sevenDayResetsAt: reset,
    })
    expect(before).toBeCloseTo(41 / 144, 6)
    expect(after).toBeCloseTo(65 / 144, 6)
    expect(after).not.toBe(before)
  })

  it("clamps to 1 at full elapsed, with a Sunday-aligned window", () => {
    const f = elapsedFraction({
      now: SUN_MAY_10_NOON,
      sevenDayResetsAt: isoOf(MON_MAY_11_MIDNIGHT),
    })
    expect(f).toBe(1)
  })

  it("returns 1 when the reset is null (treat as fully elapsed)", () => {
    expect(elapsedFraction({ now: MON_MAY_4_1800, sevenDayResetsAt: null })).toBe(1)
  })
})

describe("paceHoursDiff", () => {
  it("scales by 144 (= 6 × 24, the Sunday-excluded week)", () => {
    expect(paceHoursDiff({ elapsedFraction: 1, usedFraction: 0 })).toBe(144)
    expect(paceHoursDiff({ elapsedFraction: 0, usedFraction: 1 })).toBe(-144)
    expect(paceHoursDiff({ elapsedFraction: 0.5, usedFraction: 0.5 })).toBe(0)
  })
})

describe("hoursRemaining (UTC Sunday excluded)", () => {
  it("subtracts Sunday hours from the (reset − now) gap", () => {
    const h = hoursRemaining({
      now: FRI_MAY_8_1800,
      sevenDayResetsAt: isoOf(WED_MAY_13_1800),
    })
    expect(h).toBeCloseTo(96, 4)
  })

  it("matches (reset − now)/h when no Sunday lies in the gap", () => {
    const h = hoursRemaining({
      now: MON_MAY_4_MIDNIGHT,
      sevenDayResetsAt: isoOf(TUE_MAY_5_NOON),
    })
    expect(h).toBeCloseTo(36, 4)
  })

  it("falls back to 144 (HOURS_FALLBACK) when reset is null", () => {
    expect(hoursRemaining({ now: MON_MAY_4_1800, sevenDayResetsAt: null })).toBe(144)
  })

  it("clamps to a positive minimum when reset is in the past", () => {
    const past = isoOf(MON_MAY_4_1800 - 10 * DAY)
    const h = hoursRemaining({ now: MON_MAY_4_1800, sevenDayResetsAt: past })
    expect(h).toBeGreaterThan(0)
  })
})

describe("computePacingDerivations", () => {
  it("subtracts 5 hours for fiveHourStartedAt", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: null,
      fiveHourResetsAt: isoOf(MON_MAY_4_1800 + 2 * HOUR),
    })
    expect(out.fiveHourStartedAt).toBe(isoOf(MON_MAY_4_1800 + 2 * HOUR - 5 * HOUR))
  })

  it("subtracts 7 days for sevenDayStartedAt", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: isoOf(WED_MAY_6_1800),
      fiveHourResetsAt: null,
    })
    expect(out.sevenDayStartedAt).toBe(isoOf(WED_MAY_6_1800 - 7 * DAY))
  })

  it("returns null derived starts when reset is null", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: null,
      fiveHourResetsAt: null,
    })
    expect(out.fiveHourStartedAt).toBeNull()
    expect(out.sevenDayStartedAt).toBeNull()
  })

  it("returns null derived starts when reset is unparseable", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: "not-an-iso",
      fiveHourResetsAt: "also-bad",
    })
    expect(out.fiveHourStartedAt).toBeNull()
    expect(out.sevenDayStartedAt).toBeNull()
  })

  it("burnRateNeeded uses Sunday-excluded hoursRemaining", () => {
    const reset = isoOf(MON_MAY_4_1800 + DAY)
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: reset,
      fiveHourResetsAt: null,
    })
    expect(out.burnRateNeeded).toBeCloseTo(0.5 / 24, 5)
  })

  it("burnRateNeeded falls back to 144 when reset is missing", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 0,
      sevenDayResetsAt: null,
      fiveHourResetsAt: null,
    })
    expect(out.burnRateNeeded).toBeCloseTo(1 / 144, 5)
  })

  it("burnRateNeeded subtracts Sunday from the remaining-hours denominator", () => {
    const out = computePacingDerivations({
      now: FRI_MAY_8_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: isoOf(WED_MAY_13_1800),
      fiveHourResetsAt: null,
    })
    expect(out.burnRateNeeded).toBeCloseTo(0.5 / 96, 5)
  })

  it("paceHoursDiff treats unknown reset as fully elapsed (144 hours)", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 0,
      sevenDayResetsAt: null,
      fiveHourResetsAt: null,
    })
    expect(out.paceHoursDiff).toBe(144)
  })

  it("paceHoursDiff matches (elapsedFraction − usedFraction) × 144 with Sunday excluded", () => {
    const out = computePacingDerivations({
      now: MON_MAY_4_1800,
      sevenDayUtil: 50,
      sevenDayResetsAt: isoOf(WED_MAY_6_1800),
      fiveHourResetsAt: null,
    })
    expect(out.paceHoursDiff).toBeCloseTo(40, 4)
  })
})

describe("effectiveSessionUtilization", () => {
  it("passes the raw 5h utilization through when weekly is below 100", () => {
    expect(effectiveSessionUtilization({ fiveHourUtil: 30, sevenDayUtil: 40 })).toBe(30)
  })

  it("returns the raw 5h utilization unchanged at the weekly boundary (99.9)", () => {
    expect(effectiveSessionUtilization({ fiveHourUtil: 12, sevenDayUtil: 99.9 })).toBe(12)
  })

  it("forces session to 100 when weekly is exactly 100, overriding a low 5h value", () => {
    expect(effectiveSessionUtilization({ fiveHourUtil: 5, sevenDayUtil: 100 })).toBe(100)
  })

  it("forces session to 100 when weekly exceeds 100", () => {
    expect(effectiveSessionUtilization({ fiveHourUtil: 0, sevenDayUtil: 137 })).toBe(100)
  })
})

describe("formatPaceHours", () => {
  it("formats zero with a positive sign and two-decimal padding", () => {
    expect(formatPaceHours(0)).toBe("+0.00")
  })

  it("formats positive values with a + sign", () => {
    expect(formatPaceHours(1.23)).toBe("+1.23")
    expect(formatPaceHours(0.5)).toBe("+0.50")
    expect(formatPaceHours(144)).toBe("+144.00")
  })

  it("formats negative values with a - sign", () => {
    expect(formatPaceHours(-1.23)).toBe("-1.23")
    expect(formatPaceHours(-0.5)).toBe("-0.50")
    expect(formatPaceHours(-144)).toBe("-144.00")
  })

  it("rounds to the nearest 0.01", () => {
    expect(formatPaceHours(1.234)).toBe("+1.23")
    expect(formatPaceHours(1.235)).toBe("+1.24")
    expect(formatPaceHours(-1.234)).toBe("-1.23")
  })
})
