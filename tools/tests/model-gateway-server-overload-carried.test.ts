import { describe, expect, test } from "bun:test"
import {
  classifyServerOverload,
  isServerOverload,
  MAX_RETRY_AFTER_MS,
  serverOverloadBackoffMs,
} from "../lib/model-gateway/server-overload.ts"
import { CARRIED } from "./model-gateway-server-overload-vectors.ts"

const OVERLOADED_429_BODY = CARRIED.OVERLOADED_429

const RATE_LIMIT_429_BODY = CARRIED.RATE_LIMIT_429

const OVERLOADED_529_BODY = CARRIED.OVERLOADED_529

describe("isServerOverload", () => {
  test("matches a 529 on status alone (with envelope)", () => {
    expect(isServerOverload(529, OVERLOADED_529_BODY)).toBe(true)
  })

  test("matches a bare 529 with no parseable envelope", () => {
    expect(isServerOverload(529, "<html>529 Overloaded</html>")).toBe(true)
    expect(isServerOverload(529, "")).toBe(true)
  })

  test("matches a 429 with an overloaded_error envelope", () => {
    expect(isServerOverload(429, OVERLOADED_429_BODY)).toBe(true)
  })

  test("does NOT match an account-cap 429 (rate_limit_error)", () => {
    expect(isServerOverload(429, RATE_LIMIT_429_BODY)).toBe(false)
  })

  test("does NOT match a 429 with no parseable envelope", () => {
    expect(isServerOverload(429, "<html>429</html>")).toBe(false)
    expect(isServerOverload(429, "")).toBe(false)
  })

  test("does NOT match unrelated statuses", () => {
    expect(isServerOverload(200, OVERLOADED_429_BODY)).toBe(false)
    expect(isServerOverload(403, OVERLOADED_429_BODY)).toBe(false)
    expect(isServerOverload(404, OVERLOADED_429_BODY)).toBe(false)
    expect(isServerOverload(500, OVERLOADED_529_BODY)).toBe(false)
  })
})

describe("classifyServerOverload", () => {
  test("529 reason carries the envelope message when present", () => {
    const c = classifyServerOverload(529, OVERLOADED_529_BODY)
    expect(c).toEqual({ matched: true, reason: "Overloaded" })
  })

  test("529 reason falls back to a bare marker with no envelope", () => {
    const c = classifyServerOverload(529, "gateway timeout page")
    expect(c).toEqual({ matched: true, reason: "overloaded (529)" })
  })

  test("429 overloaded reason carries error.message", () => {
    const c = classifyServerOverload(429, OVERLOADED_429_BODY)
    expect(c).toEqual({ matched: true, reason: "Overloaded" })
  })

  test("429 overloaded reason falls back to the bare type when message omitted", () => {
    const body = JSON.stringify({ type: "error", error: { type: "overloaded_error" } })
    const c = classifyServerOverload(429, body)
    expect(c).toEqual({ matched: true, reason: "overloaded_error" })
  })

  test("account-cap 429 does not match", () => {
    expect(classifyServerOverload(429, RATE_LIMIT_429_BODY)).toEqual({ matched: false })
  })
})

describe("serverOverloadBackoffMs", () => {
  const schedule = [1000, 2000, 4000] as const

  test("uses the schedule entry when no Retry-After header", () => {
    expect(serverOverloadBackoffMs({ retryAfterHeader: null, attempt: 0, schedule })).toBe(1000)
    expect(serverOverloadBackoffMs({ retryAfterHeader: null, attempt: 1, schedule })).toBe(2000)
    expect(serverOverloadBackoffMs({ retryAfterHeader: null, attempt: 2, schedule })).toBe(4000)
  })

  test("clamps attempt past the schedule to the last entry", () => {
    expect(serverOverloadBackoffMs({ retryAfterHeader: null, attempt: 99, schedule })).toBe(4000)
  })

  test("honors a numeric-seconds Retry-After header (converted to ms)", () => {
    expect(serverOverloadBackoffMs({ retryAfterHeader: "2", attempt: 0, schedule })).toBe(2000)
  })

  test("caps a large Retry-After at MAX_RETRY_AFTER_MS", () => {
    expect(serverOverloadBackoffMs({ retryAfterHeader: "600", attempt: 0, schedule })).toBe(
      MAX_RETRY_AFTER_MS
    )
  })

  test("ignores a non-numeric or non-positive Retry-After, falling back to schedule", () => {
    expect(
      serverOverloadBackoffMs({
        retryAfterHeader: "Wed, 21 Oct 2026 07:28:00 GMT",
        attempt: 0,
        schedule,
      })
    ).toBe(1000)
    expect(serverOverloadBackoffMs({ retryAfterHeader: "0", attempt: 1, schedule })).toBe(2000)
    expect(serverOverloadBackoffMs({ retryAfterHeader: "-5", attempt: 1, schedule })).toBe(2000)
    expect(serverOverloadBackoffMs({ retryAfterHeader: "", attempt: 2, schedule })).toBe(4000)
  })
})
