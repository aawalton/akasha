
import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import type { CredentialDb } from "../lib/oauth-page-db"
import { refreshOAuthTokenWithOutcome } from "../lib/oauth-credentials.ts"
import { parseFutureIsoMs, selectBestAccount } from "../lib/oauth-credentials-select"
import type { AccountState, CredentialDoc } from "../lib/oauth-types.ts"

function createFetchStub(handler: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} }) as unknown as typeof fetch
}

const db: CredentialDb = {
  getCredential: async (account: string) => ({
    account,
    accessToken: "stale-access",
    refreshToken: "stale-refresh",
    expiresAt: 0,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
  }),
  getAllCredentials: async () => [],
  getClaudeAccountPacing: async () => new Map(),
  updateTokenIfNewer: async () => undefined,
}

const realFetch = globalThis.fetch

function stubFetch(status: number, body: string): undefined {
  globalThis.fetch = createFetchStub(
    async () =>
      new Response(body, {
        status,
        headers: { "Content-Type": "application/json" },
      })
  )
}

beforeEach(() => {
  globalThis.fetch = realFetch
})

afterAll(() => {
  globalThis.fetch = realFetch
})

describe("a page write that fails does not take the refresh with it", () => {
  it("returns the freshly issued pair rather than losing it", async () => {
    const refusing: CredentialDb = {
      ...db,
      updateTokenIfNewer: async () => {
        throw new Error("no page stands at pages/claude-account/acme.claude-account.md")
      },
    }
    stubFetch(
      200,
      JSON.stringify({
        access_token: "fresh-access",
        refresh_token: "fresh-refresh",
        expires_in: 3600,
      })
    )
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", refusing)
    expect(out.ok).toBe(true)
    if (!out.ok) throw new Error("expected the refresh to stand")
    expect(out.credential.accessToken).toBe("fresh-access")
    expect(out.credential.refreshToken).toBe("fresh-refresh")
  })
})

describe("refreshOAuthTokenWithOutcome", () => {
  it("flags invalid_grant as terminal", async () => {
    stubFetch(
      400,
      JSON.stringify({ error: "invalid_grant", error_description: "Refresh token expired" })
    )
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.terminal).toBe(true)
    expect(out.code).toBe("invalid_grant")
    expect(out.status).toBe(400)
  })

  it("flags 5xx as non-terminal (retryable)", async () => {
    stubFetch(503, "service down")
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.terminal).toBe(false)
    expect(out.status).toBe(503)
  })

  it("flags network error as non-terminal exception", async () => {
    globalThis.fetch = createFetchStub(async () => {
      throw new Error("ECONNRESET")
    })
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.terminal).toBe(false)
    expect(out.reason).toBe("exception")
  })

  it("flags invalid_request 4xx as non-terminal", async () => {
    stubFetch(400, JSON.stringify({ error: "invalid_request" }))
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.terminal).toBe(false)
    expect(out.code).toBe("invalid_request")
  })

  it("flags 200 with malformed body as non-terminal malformed_response", async () => {
    stubFetch(200, JSON.stringify({}))
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.terminal).toBe(false)
    expect(out.reason).toBe("http-error")
    expect(out.code).toBe("malformed_response")
    expect(out.status).toBe(200)
  })

  it("rejects a rotation-with-empty-body 200 (empty access_token) as malformed, never persisting it (#15294)", async () => {
    stubFetch(200, JSON.stringify({ access_token: "", refresh_token: "rt", expires_in: 3600 }))
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.terminal).toBe(false)
    expect(out.code).toBe("malformed_response")
  })

  it("rejects a 200 with empty refresh_token as malformed (#15294)", async () => {
    stubFetch(200, JSON.stringify({ access_token: "at", refresh_token: "", expires_in: 3600 }))
    const out = await refreshOAuthTokenWithOutcome("acme", "[oauth]", db)
    expect(out.ok).toBe(false)
    if (out.ok) throw new Error("expected failure")
    expect(out.code).toBe("malformed_response")
  })
})

describe("parseFutureIsoMs", () => {
  const now = Date.UTC(2026, 4, 4, 20, 30, 0)

  it("returns null for null input", () => {
    expect(parseFutureIsoMs(null, now)).toBe(null)
  })

  it("returns null for unparseable ISO string", () => {
    expect(parseFutureIsoMs("not-a-date", now)).toBe(null)
  })

  it("returns null for ISO timestamp before now (stale window)", () => {
    expect(parseFutureIsoMs("2026-05-04T20:00:00Z", now)).toBe(null)
  })

  it("returns null for ISO timestamp equal to now (boundary)", () => {
    expect(parseFutureIsoMs("2026-05-04T20:30:00Z", now)).toBe(null)
  })

  it("returns ms for ISO timestamp strictly after now", () => {
    const future = "2026-05-05T01:00:00Z"
    expect(parseFutureIsoMs(future, now)).toBe(Date.parse(future))
  })
})

describe("selectBestAccount", () => {
  const now = Date.parse("2026-07-06T12:00:00.000Z")

  function cred(account: string, over: Partial<CredentialDoc> = {}): CredentialDoc {
    return {
      account,
      accessToken: `at-${account}`,
      refreshToken: `rt-${account}`,
      expiresAt: now + 3_600_000,
      subscriptionType: "max",
      ...over,
    }
  }

  function state(account: string, over: Partial<AccountState> = {}): AccountState {
    return {
      account,
      fiveHourUtil: 0,
      sevenDayUtil: 0,
      sevenDayResetsAt: null,
      fiveHourResetsAt: null,
      subscriptionType: "max",
      subscriptionDisabled: false,
      fiveHourAtLimitUntil: null,
      renewalTerminal: false,
      accessTokenExpiresAt: null,
      ...over,
    }
  }

  it("returns null when there are no credentials", () => {
    expect(selectBestAccount([], new Map(), now)).toBe(null)
  })

  it("selects a credentialed account that has no pacing row (defaultState fallback)", () => {
    const picked = selectBestAccount([cred("orphan")], new Map(), now)
    expect(picked?.cred.account).toBe("orphan")
  })

  it("picks the eligible account with the soonest weekly reset", () => {
    const creds = [cred("later"), cred("sooner")]
    const pacing = new Map<string, AccountState>([
      ["later", state("later", { sevenDayResetsAt: new Date(now + 5 * 86_400_000).toISOString() })],
      [
        "sooner",
        state("sooner", { sevenDayResetsAt: new Date(now + 2 * 86_400_000).toISOString() }),
      ],
    ])
    expect(selectBestAccount(creds, pacing, now)?.cred.account).toBe("sooner")
  })

  it("skips excluded accounts", () => {
    const creds = [cred("later"), cred("sooner")]
    const pacing = new Map<string, AccountState>([
      ["later", state("later", { sevenDayResetsAt: new Date(now + 5 * 86_400_000).toISOString() })],
      [
        "sooner",
        state("sooner", { sevenDayResetsAt: new Date(now + 2 * 86_400_000).toISOString() }),
      ],
    ])
    const picked = selectBestAccount(creds, pacing, now, new Set(["sooner"]))
    expect(picked?.cred.account).toBe("later")
  })
})
