import { describe, expect, test } from "bun:test"
import type { Forward } from "../lib/model-gateway/forward.ts"
import {
  attemptServerErrorRetry,
  type ServerErrorRetryArgs,
} from "../lib/model-gateway/server-error-retry.ts"
import {
  classifyServerError,
  isServerError,
  MAX_RETRY_AFTER_MS,
  serverErrorBackoffMs,
} from "../lib/model-gateway/server-error.ts"
import type { OAuthCredential } from "../lib/oauth-types.ts"
import { CARRIED } from "./model-gateway-server-error-vectors.ts"

const OVERLOADED_429_BODY = CARRIED.OVERLOADED_429

const RATE_LIMIT_429_BODY = CARRIED.RATE_LIMIT_429

const OVERLOADED_529_BODY = CARRIED.OVERLOADED_529

const API_ERROR_BODY = CARRIED.API_ERROR_500

const PLAIN_SERVER_ERROR_STATUSES = [500, 502, 503] as const

describe("isServerError", () => {
  test("matches a 529 on status alone (with envelope)", () => {
    expect(isServerError(529, OVERLOADED_529_BODY)).toBe(true)
  })

  test("matches a bare 529 with no parseable envelope", () => {
    expect(isServerError(529, "<html>529 Overloaded</html>")).toBe(true)
    expect(isServerError(529, "")).toBe(true)
  })

  test("matches a 429 with an overloaded_error envelope", () => {
    expect(isServerError(429, OVERLOADED_429_BODY)).toBe(true)
  })

  test("matches a 500, 502 and 503 on status alone", () => {
    expect(isServerError(500, API_ERROR_BODY)).toBe(true)
    expect(isServerError(500, "")).toBe(true)
    expect(isServerError(502, "<html>502 Bad Gateway</html>")).toBe(true)
    expect(isServerError(503, "")).toBe(true)
  })

  test("does NOT match an account-cap 429 (rate_limit_error)", () => {
    expect(isServerError(429, RATE_LIMIT_429_BODY)).toBe(false)
  })

  test("does NOT match a 429 with no parseable envelope", () => {
    expect(isServerError(429, "<html>429</html>")).toBe(false)
    expect(isServerError(429, "")).toBe(false)
  })

  test("does NOT match unrelated statuses", () => {
    expect(isServerError(200, OVERLOADED_429_BODY)).toBe(false)
    expect(isServerError(403, OVERLOADED_429_BODY)).toBe(false)
    expect(isServerError(404, OVERLOADED_429_BODY)).toBe(false)
    expect(isServerError(501, OVERLOADED_529_BODY)).toBe(false)
    expect(isServerError(504, OVERLOADED_529_BODY)).toBe(false)
  })
})

describe("classifyServerError", () => {
  test("529 reason carries the envelope message when present", () => {
    const c = classifyServerError(529, OVERLOADED_529_BODY)
    expect(c).toEqual({ matched: true, reason: "Overloaded" })
  })

  test("529 reason falls back to a bare marker with no envelope", () => {
    const c = classifyServerError(529, "gateway timeout page")
    expect(c).toEqual({ matched: true, reason: "overloaded (529)" })
  })

  test("429 overloaded reason carries error.message", () => {
    const c = classifyServerError(429, OVERLOADED_429_BODY)
    expect(c).toEqual({ matched: true, reason: "Overloaded" })
  })

  test("429 overloaded reason falls back to the bare type when message omitted", () => {
    const body = JSON.stringify({ type: "error", error: { type: "overloaded_error" } })
    const c = classifyServerError(429, body)
    expect(c).toEqual({ matched: true, reason: "overloaded_error" })
  })

  test("500, 502 and 503 reasons carry the envelope message when present", () => {
    expect(classifyServerError(500, API_ERROR_BODY)).toEqual({
      matched: true,
      reason: "Internal server error",
    })
    expect(classifyServerError(502, API_ERROR_BODY)).toEqual({
      matched: true,
      reason: "Internal server error",
    })
    expect(classifyServerError(503, API_ERROR_BODY)).toEqual({
      matched: true,
      reason: "Internal server error",
    })
  })

  test("500, 502 and 503 reasons fall back to a literal naming the status", () => {
    expect(classifyServerError(500, "<html>500 Internal Server Error</html>")).toEqual({
      matched: true,
      reason: "internal server error (500)",
    })
    expect(classifyServerError(502, "")).toEqual({
      matched: true,
      reason: "bad gateway (502)",
    })
    expect(classifyServerError(503, "upstream is down")).toEqual({
      matched: true,
      reason: "service unavailable (503)",
    })
  })

  test("account-cap 429 does not match", () => {
    expect(classifyServerError(429, RATE_LIMIT_429_BODY)).toEqual({ matched: false })
  })
})

describe("serverErrorBackoffMs", () => {
  const schedule = [1000, 2000, 4000] as const

  test("uses the schedule entry when no Retry-After header", () => {
    expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 0, schedule })).toBe(1000)
    expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 1, schedule })).toBe(2000)
    expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 2, schedule })).toBe(4000)
  })

  test("clamps attempt past the schedule to the last entry", () => {
    expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 99, schedule })).toBe(4000)
  })

  test("honors a numeric-seconds Retry-After header (converted to ms)", () => {
    expect(serverErrorBackoffMs({ retryAfterHeader: "2", attempt: 0, schedule })).toBe(2000)
  })

  test("caps a large Retry-After at MAX_RETRY_AFTER_MS", () => {
    expect(serverErrorBackoffMs({ retryAfterHeader: "600", attempt: 0, schedule })).toBe(
      MAX_RETRY_AFTER_MS
    )
  })

  test("ignores a non-numeric or non-positive Retry-After, falling back to schedule", () => {
    expect(
      serverErrorBackoffMs({
        retryAfterHeader: "Wed, 21 Oct 2026 07:28:00 GMT",
        attempt: 0,
        schedule,
      })
    ).toBe(1000)
    expect(serverErrorBackoffMs({ retryAfterHeader: "0", attempt: 1, schedule })).toBe(2000)
    expect(serverErrorBackoffMs({ retryAfterHeader: "-5", attempt: 1, schedule })).toBe(2000)
    expect(serverErrorBackoffMs({ retryAfterHeader: "", attempt: 2, schedule })).toBe(4000)
  })
})

const RETRY_SCHEDULE = [10, 20, 40] as const

function credential(): OAuthCredential {
  return {
    account: "alanwalton",
    accessToken: "token",
    refreshToken: "refresh",
    expiresAt: Date.now() + 3_600_000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

function retryArgs(parts: {
  res: Response
  forward: Forward
  sleep: (ms: number) => Promise<void>
}): ServerErrorRetryArgs {
  return {
    res: parts.res,
    req: new Request("https://api.anthropic.com/v1/messages", { method: "POST" }),
    currentAccount: "alanwalton",
    currentCred: credential(),
    bodyBuffer: null,
    observerSlot: { current: null },
    trail: ["alanwalton"],
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[oauth-proxy]",
    forward: parts.forward,
    schedule: RETRY_SCHEDULE,
    sleep: parts.sleep,
  }
}

describe("attemptServerErrorRetry", () => {
  for (const status of PLAIN_SERVER_ERROR_STATUSES) {
    test(`retries a persistent ${status} once per schedule entry, waiting each entry`, async () => {
      const waits: number[] = []
      let forwarded = 0
      const outcome = await attemptServerErrorRetry(
        retryArgs({
          res: new Response(`upstream ${status}`, { status }),
          sleep: async (ms) => {
            waits.push(ms)
          },
          forward: async () => {
            forwarded += 1
            return new Response(`upstream ${status}`, { status })
          },
        })
      )
      expect(forwarded).toBe(3)
      expect(waits).toEqual([10, 20, 40])
      expect(outcome.kind).toBe("passthrough")
    })

    test(`passes a persistent ${status} through unchanged once the retries run out`, async () => {
      const outcome = await attemptServerErrorRetry(
        retryArgs({
          res: new Response(`upstream ${status}`, { status }),
          sleep: async () => {},
          forward: async () => new Response(`upstream ${status}`, { status }),
        })
      )
      expect(outcome.kind).toBe("passthrough")
      if (outcome.kind !== "passthrough") throw new Error("expected passthrough")
      expect(outcome.response.status).toBe(status)
      expect(await outcome.response.text()).toBe(`upstream ${status}`)
    })

    test(`stops retrying a ${status} the moment upstream answers`, async () => {
      const waits: number[] = []
      let forwarded = 0
      const outcome = await attemptServerErrorRetry(
        retryArgs({
          res: new Response(`upstream ${status}`, { status }),
          sleep: async (ms) => {
            waits.push(ms)
          },
          forward: async () => {
            forwarded += 1
            return new Response("ok", { status: 200 })
          },
        })
      )
      expect(forwarded).toBe(1)
      expect(waits).toEqual([10])
      expect(outcome.kind).toBe("resolved")
      if (outcome.kind !== "resolved") throw new Error("expected resolved")
      expect(outcome.res.status).toBe(200)
      expect(await outcome.res.text()).toBe("ok")
    })
  }

  test("leaves an account-cap 429 alone, forwarding nothing", async () => {
    let forwarded = 0
    const outcome = await attemptServerErrorRetry(
      retryArgs({
        res: new Response(RATE_LIMIT_429_BODY, { status: 429 }),
        sleep: async () => {},
        forward: async () => {
          forwarded += 1
          return new Response("ok", { status: 200 })
        },
      })
    )
    expect(forwarded).toBe(0)
    expect(outcome.kind).toBe("resolved")
    if (outcome.kind !== "resolved") throw new Error("expected resolved")
    expect(outcome.res.status).toBe(429)
    expect(await outcome.res.text()).toBe(RATE_LIMIT_429_BODY)
  })
})
