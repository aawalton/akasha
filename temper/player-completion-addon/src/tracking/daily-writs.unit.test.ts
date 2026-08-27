import { describe, expect, it } from "bun:test"
import { getEsoDateString, getEsoResetTimestamp } from "./daily-writs"

function utcSec(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0
): number {
  return Date.UTC(year, month - 1, day, hour, minute, second) / 1000
}

describe("getEsoResetTimestamp", () => {
  it("midwinter EST after reset → today 11:00 UTC", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 2, 15, 12))).toBe(utcSec(2026, 2, 15, 11))
  })

  it("midwinter EST before reset → yesterday 11:00 UTC", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 2, 15, 10, 30))).toBe(utcSec(2026, 2, 14, 11))
  })

  it("midsummer EDT after reset → today 10:00 UTC", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 7, 15, 12))).toBe(utcSec(2026, 7, 15, 10))
  })

  it("midsummer EDT before reset → yesterday 10:00 UTC", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 7, 15, 9, 30))).toBe(utcSec(2026, 7, 14, 10))
  })

  it("spring DST transition day after reset", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 3, 8, 11))).toBe(utcSec(2026, 3, 8, 10))
  })

  it("spring DST transition day before reset → previous EST reset", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 3, 8, 9))).toBe(utcSec(2026, 3, 7, 11))
  })

  it("fall DST transition day after reset", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 11, 1, 12))).toBe(utcSec(2026, 11, 1, 11))
  })

  it("fall DST transition day before reset → previous EDT reset", () => {
    expect(getEsoResetTimestamp(utcSec(2026, 11, 1, 10, 30))).toBe(utcSec(2026, 10, 31, 10))
  })
})

describe("getEsoDateString", () => {
  it("midwinter EST after reset", () => {
    expect(getEsoDateString(utcSec(2026, 2, 15, 12))).toBe("2026-02-15")
  })

  it("midwinter EST before reset", () => {
    expect(getEsoDateString(utcSec(2026, 2, 15, 10, 30))).toBe("2026-02-14")
  })

  it("midsummer EDT after reset", () => {
    expect(getEsoDateString(utcSec(2026, 7, 15, 12))).toBe("2026-07-15")
  })

  it("midsummer EDT before reset", () => {
    expect(getEsoDateString(utcSec(2026, 7, 15, 9, 30))).toBe("2026-07-14")
  })

  it("spring DST transition day after reset", () => {
    expect(getEsoDateString(utcSec(2026, 3, 8, 11))).toBe("2026-03-08")
  })

  it("spring DST transition day before reset (still in previous EST day)", () => {
    expect(getEsoDateString(utcSec(2026, 3, 8, 9))).toBe("2026-03-07")
  })

  it("fall DST transition day after reset", () => {
    expect(getEsoDateString(utcSec(2026, 11, 1, 12))).toBe("2026-11-01")
  })

  it("fall DST transition day before reset (still in previous EDT day)", () => {
    expect(getEsoDateString(utcSec(2026, 11, 1, 10, 30))).toBe("2026-10-31")
  })

  it("year boundary: before 2026-01-01 EST reset rolls back to 2025-12-31", () => {
    expect(getEsoDateString(utcSec(2026, 1, 1, 5))).toBe("2025-12-31")
  })
})
