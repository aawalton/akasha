import { describe, expect, test } from "bun:test"
import type { PoolSummary } from "../lib/oauth-selection"
import {
  buildRateLimitErrorPayload,
  DEFAULT_RETRY_AFTER_SECONDS,
  MIN_RETRY_AFTER_SECONDS,
  rateLimitResponse,
} from "../lib/model-gateway/rate-limit-response.ts"
import { shape } from "../lib/shape.ts"

const NOW = Date.UTC(2026, 4, 1)

function summary(overrides: Partial<PoolSummary> = {}): PoolSummary {
  return { eligibleCount: 0, totalCount: 3, earliestEligibleResetMs: null, ...overrides }
}

describe("buildRateLimitErrorPayload", () => {
  test("envelope is the Anthropic rate_limit_error shape with status 429", () => {
    const p = buildRateLimitErrorPayload(summary(), NOW)
    expect(p.status).toBe(429)
    expect(p.body.type).toBe("error")
    expect(p.body.error.type).toBe("rate_limit_error")
    expect(typeof p.body.error.message).toBe("string")
  })

  test("message names real pool state (eligible of total)", () => {
    const p = buildRateLimitErrorPayload(summary({ eligibleCount: 1, totalCount: 4 }), NOW)
    expect(p.body.error.message).toContain("1 of 4 accounts currently eligible")
  })

  test("known future reset → Retry-After is ceil(seconds) to that instant", () => {
    const p = buildRateLimitErrorPayload(summary({ earliestEligibleResetMs: NOW + 90_500 }), NOW)
    expect(p.retryAfterSeconds).toBe(91)
    expect(p.body.error.message).toContain("earliest limit reset at")
  })

  test("unknown reset → default Retry-After and an explicit 'unknown' phrase", () => {
    const p = buildRateLimitErrorPayload(summary({ earliestEligibleResetMs: null }), NOW)
    expect(p.retryAfterSeconds).toBe(DEFAULT_RETRY_AFTER_SECONDS)
    expect(p.body.error.message).toContain("earliest reset unknown")
  })

  test("past reset (clock skew) → default Retry-After, never 0/negative", () => {
    const p = buildRateLimitErrorPayload(summary({ earliestEligibleResetMs: NOW - 5000 }), NOW)
    expect(p.retryAfterSeconds).toBe(DEFAULT_RETRY_AFTER_SECONDS)
  })

  test("sub-second future reset floors at MIN_RETRY_AFTER_SECONDS", () => {
    const p = buildRateLimitErrorPayload(summary({ earliestEligibleResetMs: NOW + 200 }), NOW)
    expect(p.retryAfterSeconds).toBe(MIN_RETRY_AFTER_SECONDS)
  })
})

describe("rateLimitResponse", () => {
  test("carries status 429, JSON body, and Retry-After header", async () => {
    const res = rateLimitResponse(summary({ earliestEligibleResetMs: NOW + 30_000 }), NOW)
    expect(res.status).toBe(429)
    expect(res.headers.get("content-type")).toBe("application/json")
    expect(res.headers.get("retry-after")).toBe("30")
    const parsed = shape
      .object({ error: shape.object({ type: shape.string() }) })
      .parse(await res.json())
    expect(parsed.error.type).toBe("rate_limit_error")
  })
})
