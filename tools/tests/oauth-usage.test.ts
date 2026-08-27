
import { afterEach, describe, expect, it } from "bun:test"
import { fetchUsage, parseUsageResponse } from "../lib/oauth-usage.ts"

type FetchHandler = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

function createFetchStub(handler: FetchHandler): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} })
}

const realFetch = globalThis.fetch

function stubUsageResponse(status: number, body: unknown): undefined {
  globalThis.fetch = createFetchStub(
    async () => new Response(typeof body === "string" ? body : JSON.stringify(body), { status })
  )
}

describe("parseUsageResponse", () => {
  it("narrows a valid body to the two consumed windows", () => {
    const usage = parseUsageResponse({
      five_hour: { utilization: 7, resets_at: "2026-07-18T10:09:59Z", limit_dollars: null },
      seven_day: { utilization: 44, resets_at: "2026-07-18T09:59:59Z" },
      seven_day_opus: null,
      limits: [{ kind: "session", percent: 0 }],
    })
    expect(usage.five_hour.utilization).toBe(7)
    expect(usage.five_hour.resets_at).toBe("2026-07-18T10:09:59Z")
    expect(usage.seven_day.utilization).toBe(44)
    expect(Object.keys(usage.five_hour).sort()).toEqual(["resets_at", "utilization"])
  })

  it("preserves a genuine zero utilization (upstream truth, not a coercion)", () => {
    const usage = parseUsageResponse({
      five_hour: { utilization: 0, resets_at: null },
      seven_day: { utilization: 0, resets_at: "2026-07-18T09:59:59Z" },
    })
    expect(usage.five_hour.utilization).toBe(0)
    expect(usage.five_hour.resets_at).toBeNull()
    expect(usage.seven_day.utilization).toBe(0)
  })

  it("THROWS on an absent utilization — never silently defaults to 0 (false-0% fix)", () => {
    expect(() =>
      parseUsageResponse({
        five_hour: { utilization: 0, resets_at: null },
        seven_day: { resets_at: "2026-07-18T09:59:59Z" },
      })
    ).toThrow(/malformed/i)
  })

  it("throws on a missing window", () => {
    expect(() => parseUsageResponse({ five_hour: { utilization: 0, resets_at: null } })).toThrow(
      /malformed/i
    )
  })

  it("throws on a non-object body", () => {
    expect(() => parseUsageResponse(null)).toThrow(/malformed/i)
    expect(() => parseUsageResponse("nope")).toThrow(/malformed/i)
  })
})

describe("fetchUsage — validates at the boundary", () => {
  afterEach(() => {
    globalThis.fetch = realFetch
  })

  it("returns the narrowed windows on a valid 200 body", async () => {
    stubUsageResponse(200, {
      five_hour: { utilization: 3, resets_at: null },
      seven_day: { utilization: 44, resets_at: "2026-07-18T09:59:59Z" },
      limits: [],
    })
    const usage = await fetchUsage("token")
    expect(usage.seven_day.utilization).toBe(44)
    expect(usage.five_hour.resets_at).toBeNull()
  })

  it("throws on a 200 body whose seven_day.utilization is absent (false-0% guard)", async () => {
    stubUsageResponse(200, {
      five_hour: { utilization: 0, resets_at: null },
      seven_day: { resets_at: "2026-07-18T09:59:59Z" },
    })
    await expect(fetchUsage("token")).rejects.toThrow(/malformed/i)
  })

  it("still throws the status error on a non-2xx (unchanged)", async () => {
    stubUsageResponse(500, "boom")
    await expect(fetchUsage("token")).rejects.toThrow(/Usage fetch failed: 500/)
  })
})
