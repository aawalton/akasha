
import { describe, expect, test } from "bun:test"
import {
  backoffExpiryMs,
  DEFAULT_AT_LIMIT_BACKOFF_MS,
  MAX_AT_LIMIT_BACKOFF_MS,
} from "../lib/oauth-at-limit-expiry.ts"

const NOW = Date.UTC(2026, 4, 1)

describe("backoffExpiryMs — retry-after precedence", () => {
  test("positive numeric retry-after (seconds) wins", () => {
    expect(backoffExpiryMs({ now: NOW, retryAfterHeader: "120" })).toBe(NOW + 120_000)
  })

  test("zero and negative retry-after are invalid — fall through to the default", () => {
    for (const header of ["0", "-30"]) {
      expect(backoffExpiryMs({ now: NOW, retryAfterHeader: header })).toBe(
        NOW + DEFAULT_AT_LIMIT_BACKOFF_MS
      )
    }
  })

  test("non-numeric retry-after (HTTP-date, garbage, empty) falls through to the default", () => {
    for (const header of ["Wed, 21 Oct 2026 07:28:00 GMT", "soon", ""]) {
      expect(backoffExpiryMs({ now: NOW, retryAfterHeader: header })).toBe(
        NOW + DEFAULT_AT_LIMIT_BACKOFF_MS
      )
    }
  })
})

describe("backoffExpiryMs — default backoff (no window-reset latch)", () => {
  test("no retry-after → now + short default backoff", () => {
    expect(backoffExpiryMs({ now: NOW, retryAfterHeader: null })).toBe(
      NOW + DEFAULT_AT_LIMIT_BACKOFF_MS
    )
  })

  test("the default backoff is short (a few seconds), not a window-scale lockout", () => {
    expect(DEFAULT_AT_LIMIT_BACKOFF_MS).toBeLessThanOrEqual(60_000)
  })

  test("caller may override the default backoff", () => {
    expect(backoffExpiryMs({ now: NOW, retryAfterHeader: null }, 12_000)).toBe(NOW + 12_000)
  })

  test("result is always strictly in the future", () => {
    for (const header of [null, "", "soon", "0", "-1", "5"]) {
      expect(backoffExpiryMs({ now: NOW, retryAfterHeader: header })).toBeGreaterThan(NOW)
    }
  })
})

describe("backoffExpiryMs — window-scale clamp (audhdalan wrong-window fix, #15715)", () => {

  test("a weekly-scale retry-after is CLAMPED to now + 5h, never a window instant", () => {
    const threeDays = String(3 * 86_400)
    expect(backoffExpiryMs({ now: NOW, retryAfterHeader: threeDays })).toBe(
      NOW + MAX_AT_LIMIT_BACKOFF_MS
    )
  })

  test("a retry-after exactly at the 5h scope boundary is honored (not clamped past)", () => {
    expect(backoffExpiryMs({ now: NOW, retryAfterHeader: String(5 * 3_600) })).toBe(
      NOW + MAX_AT_LIMIT_BACKOFF_MS
    )
  })

  test("no header/value ever produces a mark beyond now + 5h (window-routing invariant)", () => {
    for (const header of [
      null,
      "",
      "soon",
      "0",
      "-1",
      "5",
      "120",
      "3600",
      "18000",
      "259200",
      "9999999",
    ]) {
      expect(backoffExpiryMs({ now: NOW, retryAfterHeader: header })).toBeLessThanOrEqual(
        NOW + MAX_AT_LIMIT_BACKOFF_MS
      )
    }
  })

  test("MAX_AT_LIMIT_BACKOFF_MS is the 5h scope", () => {
    expect(MAX_AT_LIMIT_BACKOFF_MS).toBe(5 * 3_600_000)
  })
})
