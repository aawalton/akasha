import { describe, expect, test } from "bun:test"
import {
  applyBurstChange,
  BURST_FADE_SECONDS,
  BURST_QUIET_SECONDS,
  burstAlpha,
  EMPTY_BURST,
  formatSignedGold,
  isBurstVisible,
} from "./session-tracking"

describe("formatSignedGold", () => {
  test("small gain (under 1K is a bare integer)", () => {
    expect(formatSignedGold(450)).toBe("+450")
  })
  test("small loss", () => {
    expect(formatSignedGold(-450)).toBe("-450")
  })
  test("three sig figs: single-digit thousands keep two decimals", () => {
    expect(formatSignedGold(1_500)).toBe("+1.50K")
  })
  test("three sig figs: tens of thousands keep one decimal", () => {
    expect(formatSignedGold(12_300)).toBe("+12.3K")
  })
  test("three sig figs: hundreds of thousands are whole", () => {
    expect(formatSignedGold(145_000)).toBe("+145K")
  })
  test("thousands keep three sig figs (no collapse to #K)", () => {
    expect(formatSignedGold(15_000)).toBe("+15.0K")
  })
  test("thousands loss keeps three sig figs", () => {
    expect(formatSignedGold(-15_000)).toBe("-15.0K")
  })
  test("three sig figs: single-digit millions keep two decimals", () => {
    expect(formatSignedGold(1_200_000)).toBe("+1.20M")
  })
  test("three sig figs: tens of millions keep one decimal", () => {
    expect(formatSignedGold(12_300_000)).toBe("+12.3M")
  })
  test("zero renders +0", () => {
    expect(formatSignedGold(0)).toBe("+0")
  })
})

describe("burst state machine", () => {
  test("first change starts the burst", () => {
    const s = applyBurstChange(EMPTY_BURST, 100, 1000)
    expect(s.amount).toBe(100)
    expect(s.lastChangeTime).toBe(1000)
  })

  test("changes in close succession accumulate", () => {
    let s = applyBurstChange(EMPTY_BURST, 100, 1000)
    s = applyBurstChange(s, 50, 1002)
    s = applyBurstChange(s, -30, 1003)
    expect(s.amount).toBe(120)
    expect(s.lastChangeTime).toBe(1003)
  })

  test("a change after the quiet+fade window starts a fresh burst", () => {
    let s = applyBurstChange(EMPTY_BURST, 100, 1000)
    const after = 1000 + BURST_QUIET_SECONDS + BURST_FADE_SECONDS
    s = applyBurstChange(s, 25, after)
    expect(s.amount).toBe(25)
    expect(s.lastChangeTime).toBe(after)
  })

  test("zero change is a no-op", () => {
    const s = applyBurstChange(EMPTY_BURST, 0, 1000)
    expect(s).toBe(EMPTY_BURST)
  })

  test("visible during quiet window, hidden after quiet+fade", () => {
    const s = applyBurstChange(EMPTY_BURST, 100, 1000)
    expect(isBurstVisible(s, 1000)).toBe(true)
    expect(isBurstVisible(s, 1000 + BURST_QUIET_SECONDS)).toBe(true)
    expect(isBurstVisible(s, 1000 + BURST_QUIET_SECONDS + BURST_FADE_SECONDS)).toBe(false)
  })

  test("empty burst is never visible", () => {
    expect(isBurstVisible(EMPTY_BURST, 5000)).toBe(false)
    expect(burstAlpha(EMPTY_BURST, 5000)).toBe(0)
  })

  test("alpha is full during quiet, fades linearly, then zero", () => {
    const s = applyBurstChange(EMPTY_BURST, 100, 1000)
    expect(burstAlpha(s, 1000)).toBe(1)
    expect(burstAlpha(s, 1000 + BURST_QUIET_SECONDS - 1)).toBe(1)
    expect(burstAlpha(s, 1000 + BURST_QUIET_SECONDS + BURST_FADE_SECONDS / 2)).toBeCloseTo(0.5)
    expect(burstAlpha(s, 1000 + BURST_QUIET_SECONDS + BURST_FADE_SECONDS)).toBe(0)
  })
})
