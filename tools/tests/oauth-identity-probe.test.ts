
import { afterEach, describe, expect, it } from "bun:test"
import { probeCredentialIdentity } from "../lib/oauth-identity-probe.ts"

const realFetch = globalThis.fetch

function createFetchStub(
  handler: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} }) as unknown as typeof fetch
}

const LIVE_BODY = {
  account: {
    uuid: "f866185e-c98d-4998-b4c6-626ffbee8799",
    full_name: "Alan Walton",
    display_name: "Alan",
    email: "aawalton@gmail.com",
    has_claude_max: true,
    has_claude_pro: false,
    created_at: "2024-10-23T17:49:38.140618Z",
  },
  organization: {
    uuid: "d40f60b4-4362-435e-9f40-ad089268d9a3",
    rate_limit_tier: "default_claude_max_20x",
    subscription_status: "active",
  },
  application: { uuid: "9d1c250a-e61b-44d9-88ed-5944d1962f5e", slug: "claude-code" },
  enabled_plugins: [],
}

function stubProfile(status: number, body: unknown, headers: Record<string, string> = {}): undefined {
  globalThis.fetch = createFetchStub(
    async () =>
      new Response(typeof body === "string" ? body : JSON.stringify(body), { status, headers })
  )
}

afterEach(() => {
  globalThis.fetch = realFetch
})

describe("probeCredentialIdentity", () => {
  it("extracts account.uuid and email from the live body shape", async () => {
    stubProfile(200, LIVE_BODY)
    expect(await probeCredentialIdentity("at")).toEqual({
      accountUuid: "f866185e-c98d-4998-b4c6-626ffbee8799",
      email: "aawalton@gmail.com",
    })
  })

  it("tolerates upstream drift — unknown keys flow through, absent email is null", async () => {
    stubProfile(200, { account: { uuid: "u-1", some_future_key: 1 }, brand_new_section: {} })
    expect(await probeCredentialIdentity("at")).toEqual({ accountUuid: "u-1", email: null })
  })

  it("sends the bearer token and hits the profile endpoint", async () => {
    const seen: { url: string; auth: string | null } = { url: "", auth: null }
    globalThis.fetch = createFetchStub(async (input, init) => {
      seen.url = String(input)
      seen.auth = new Headers(init?.headers).get("Authorization")
      return new Response(JSON.stringify(LIVE_BODY), { status: 200 })
    })
    await probeCredentialIdentity("token-abc")
    expect(seen.url).toBe("https://api.anthropic.com/api/oauth/profile")
    expect(seen.auth).toBe("Bearer token-abc")
  })

  it("throws on a non-2xx (an expired token cannot be identified, so it is not written)", async () => {
    stubProfile(401, { error: "unauthorized" })
    await expect(probeCredentialIdentity("at")).rejects.toThrow(/identity probe failed: 401/)
  })

  it("throws on a body missing account.uuid rather than returning an unknown identity", async () => {
    stubProfile(200, { account: { email: "a@b.c" } })
    await expect(probeCredentialIdentity("at")).rejects.toThrow(/malformed/)
  })

  it("throws on an empty uuid — pinning one would defeat the gate at the first push", async () => {
    stubProfile(200, { account: { uuid: "" } })
    await expect(probeCredentialIdentity("at")).rejects.toThrow(/malformed/)
  })

  it("truncates and collapses a large non-JSON error body", async () => {
    stubProfile(502, `<html>\n  <body>${"x".repeat(5000)}</body>\n</html>`, {
      "content-type": "text/html",
    })
    const err = await probeCredentialIdentity("at").catch((e: unknown) => e)
    const message = err instanceof Error ? err.message : String(err)
    expect(message).toContain("502")
    expect(message).toContain("text/html")
    expect(message.length).toBeLessThan(400)
  })

  it("never echoes the access token into a failure message", async () => {
    stubProfile(403, { error: "forbidden" })
    const err = await probeCredentialIdentity("sk-ant-oat01-SECRET").catch((e: unknown) => e)
    const message = err instanceof Error ? err.message : String(err)
    expect(message).not.toContain("sk-ant-oat01-SECRET")
  })
})
