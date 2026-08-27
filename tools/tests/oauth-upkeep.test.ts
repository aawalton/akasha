
import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import {
  fetchWith429Retry,
  RateLimitError,
  shouldTriggerWindow,
  sortAccountsAlpha,
  triggerWindowSession,
} from "../lib/oauth-upkeep.ts"

type FetchHandler = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

function createFetchStub(handler: FetchHandler): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} })
}

const realFetch = globalThis.fetch
beforeEach(() => {
  globalThis.fetch = realFetch
})
afterAll(() => {
  globalThis.fetch = realFetch
})

const usage = (overrides: { fiveHourResets?: string | null; sevenDayResets?: string | null }) => ({
  five_hour: { resets_at: overrides.fiveHourResets ?? null, utilization: 0 },
  seven_day: { resets_at: overrides.sevenDayResets ?? null, utilization: 0 },
})

describe("shouldTriggerWindow", () => {
  const now = new Date("2026-04-29T12:00:00Z")
  const future = "2026-04-29T17:00:00Z"
  const past = "2026-04-29T11:00:00Z"

  it("returns true when 5h resets_at is null", () => {
    expect(shouldTriggerWindow(usage({ fiveHourResets: null, sevenDayResets: future }), now)).toBe(
      true
    )
  })

  it("returns true when 7d resets_at is null", () => {
    expect(shouldTriggerWindow(usage({ fiveHourResets: future, sevenDayResets: null }), now)).toBe(
      true
    )
  })

  it("returns true when 5h resets_at is in the past", () => {
    expect(shouldTriggerWindow(usage({ fiveHourResets: past, sevenDayResets: future }), now)).toBe(
      true
    )
  })

  it("returns false when both resets_at are in the future", () => {
    expect(
      shouldTriggerWindow(usage({ fiveHourResets: future, sevenDayResets: future }), now)
    ).toBe(false)
  })

  it("returns true for invalid date strings (treated like null)", () => {
    expect(
      shouldTriggerWindow(usage({ fiveHourResets: "not-a-date", sevenDayResets: future }), now)
    ).toBe(true)
  })
})

describe("sortAccountsAlpha", () => {
  it("returns alphabetical order by account name", () => {
    const input = [{ account: "tempereso" }, { account: "aawalton" }, { account: "alanwalton" }]
    expect(sortAccountsAlpha(input).map((c) => c.account)).toEqual([
      "aawalton",
      "alanwalton",
      "tempereso",
    ])
  })

  it("does not mutate the input array", () => {
    const input = [{ account: "b" }, { account: "a" }]
    sortAccountsAlpha(input)
    expect(input.map((c) => c.account)).toEqual(["b", "a"])
  })
})

describe("fetchWith429Retry", () => {
  const noSleep = async () => undefined

  it("returns the value on first success", async () => {
    let calls = 0
    const result = await fetchWith429Retry(
      async () => {
        calls++
        return "ok"
      },
      "[t]",
      "label",
      [10, 20],
      noSleep
    )
    expect(result).toBe("ok")
    expect(calls).toBe(1)
  })

  it("retries up to backoff.length times on RateLimitError", async () => {
    let calls = 0
    const result = await fetchWith429Retry(
      async () => {
        calls++
        if (calls < 3) throw new RateLimitError("https://x")
        return "ok"
      },
      "[t]",
      "label",
      [10, 20],
      noSleep
    )
    expect(result).toBe("ok")
    expect(calls).toBe(3)
  })

  it("rethrows RateLimitError when retries are exhausted", async () => {
    let calls = 0
    await expect(
      fetchWith429Retry(
        async () => {
          calls++
          throw new RateLimitError("https://x")
        },
        "[t]",
        "label",
        [10, 20],
        noSleep
      )
    ).rejects.toBeInstanceOf(RateLimitError)
    expect(calls).toBe(3)
  })

  it("propagates non-RateLimitError exceptions immediately", async () => {
    let calls = 0
    await expect(
      fetchWith429Retry(
        async () => {
          calls++
          throw new Error("network down")
        },
        "[t]",
        "label",
        [10, 20],
        noSleep
      )
    ).rejects.toThrow("network down")
    expect(calls).toBe(1)
  })
})

describe("triggerWindowSession", () => {
  it("returns ok on 200", async () => {
    globalThis.fetch = createFetchStub(
      async () => new Response(JSON.stringify({ id: "msg_x" }), { status: 200 })
    )
    const result = await triggerWindowSession("token")
    expect(result).toEqual({ ok: true })
  })

  it("throws RateLimitError on 429", async () => {
    globalThis.fetch = createFetchStub(
      async () => new Response(JSON.stringify({ error: "rate_limit" }), { status: 429 })
    )
    await expect(triggerWindowSession("token")).rejects.toBeInstanceOf(RateLimitError)
  })

  it("returns { ok: false, status } on other non-200", async () => {
    globalThis.fetch = createFetchStub(
      async () => new Response(JSON.stringify({ error: "server_error" }), { status: 500 })
    )
    const result = await triggerWindowSession("token")
    expect(result).toEqual({ ok: false, status: 500 })
  })
})
