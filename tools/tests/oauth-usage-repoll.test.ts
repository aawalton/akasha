
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import type { OAuthCredential } from "../lib/oauth-types.ts"
import { repollUsageAfter429, resetRepollGateForTests } from "../lib/oauth-usage.ts"

type FetchHandler = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

function createFetchStub(handler: FetchHandler): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} })
}

const realFetch = globalThis.fetch
const realError = console.error
const realLog = console.log

type FetchCall = { url: string; authorization: string | undefined }
let fetchCalls: FetchCall[] = []

function installFailingFetch(): undefined {
  globalThis.fetch = createFetchStub(async (input, init) => {
    const url = typeof input === "string" ? input : String(input)
    const authorization = new Headers(init?.headers).get("Authorization") ?? undefined
    fetchCalls.push({ url, authorization })
    throw new Error("network down")
  })
}

function makeCred(account: string): OAuthCredential {
  return {
    account,
    accessToken: `token-${account}`,
    refreshToken: "refresh",
    expiresAt: Date.now() + 3_600_000,
    scopes: [],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

beforeEach(() => {
  fetchCalls = []
  installFailingFetch()
  console.error = () => {}
  console.log = () => {}
  resetRepollGateForTests()
})

afterEach(() => {
  globalThis.fetch = realFetch
  console.error = realError
  console.log = realLog
})

describe("repollUsageAfter429 — best-effort guard", () => {
  test("null credential short-circuits before any fetch", async () => {
    await expect(repollUsageAfter429("acct", async () => null)).resolves.toBeUndefined()
    expect(fetchCalls).toHaveLength(0)
  })

  test("a non-null credential's access token reaches the usage fetch", async () => {
    await repollUsageAfter429("acct", async () => makeCred("acct"))
    expect(fetchCalls).toHaveLength(1)
    expect(fetchCalls[0]?.authorization).toBe("Bearer token-acct")
  })

  test("swallows a failed usage fetch and never throws", async () => {
    await expect(repollUsageAfter429("acct", async () => makeCred("acct"))).resolves.toBeUndefined()
  })

  test("swallows a throwing token getter and never fetches", async () => {
    await expect(
      repollUsageAfter429("acct", async () => {
        throw new Error("token fetch failed")
      })
    ).resolves.toBeUndefined()
    expect(fetchCalls).toHaveLength(0)
  })
})

describe("repollUsageAfter429 — rate gate", () => {
  test("a burst on one account reaches the network exactly once", async () => {
    for (let i = 0; i < 50; i++) {
      await repollUsageAfter429("acct", async () => makeCred("acct"))
    }
    expect(fetchCalls).toHaveLength(1)
  })

  test("the gate is per-account, so a peer is not suppressed by its neighbour", async () => {
    await repollUsageAfter429("acct-a", async () => makeCred("acct-a"))
    await repollUsageAfter429("acct-b", async () => makeCred("acct-b"))
    expect(fetchCalls.map((c) => c.authorization)).toEqual([
      "Bearer token-acct-a",
      "Bearer token-acct-b",
    ])
  })
})
