import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync } from "node:fs"
import { join } from "node:path"
import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"
import { startOAuthProxy } from "../lib/model-gateway/gateway.ts"

type Cred = {
  account: string
  accessToken: string
  refreshToken: string
  expiresAt: number
  scopes: readonly string[]
  subscriptionType: string | null
  rateLimitTier: string | null
}

function makeCred(account: string): Cred {
  return {
    account,
    accessToken: `token-${account}`,
    refreshToken: "refresh",
    expiresAt: Date.now() + 60 * 60_000,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
  }
}

let pickImpl: (exclude: ReadonlySet<string>) => Promise<{ credential: Cred } | null> =
  async () => ({
    credential: makeCred("acct-1"),
  })

let currentGetCredentialByAccount: (account: string) => Promise<Cred | null> = async (account) =>
  makeCred(account)

const oauth = fakeOAuthEffects({
  getBestCredential: async (_logPrefix?: string, exclude: ReadonlySet<string> = new Set()) => {
    const picked = await pickImpl(exclude)
    return picked == null
      ? null
      : { ...picked, fiveHourResetsAtMs: null }
  },
  getCredentialByAccount: async (account: string) => currentGetCredentialByAccount(account),
  markAccountAtLimit: async () => undefined,
  repollUsageAfter429: async () => undefined,
})

type UpstreamHandler = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
let upstreamImpl: UpstreamHandler = async () => new Response("upstream-default", { status: 200 })

const realFetch = globalThis.fetch
function createFetchStub(handler: UpstreamHandler): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} })
}
globalThis.fetch = createFetchStub((input, init) => {
  const url = input instanceof Request ? input.url : String(input)
  if (url.startsWith("https://api.anthropic.com")) return upstreamImpl(input, init)
  return realFetch(input, init)
})

const logDir = mkdtempSync(join("/var/tmp", "oauth-proxy-inflight-"))
const proxy = startOAuthProxy({
  oauth,
  port: 0,
  logPrefix: "[inflight-test]",
  getLogDir: () => logDir,
})
const base = `http://localhost:${proxy.port}`

afterAll(() => {
  proxy.stop()
  globalThis.fetch = realFetch
})

beforeEach(() => {
  pickImpl = async () => ({ credential: makeCred("acct-1") })
  currentGetCredentialByAccount = async (account: string) => makeCred(account)
  upstreamImpl = async () => new Response("upstream-default", { status: 200 })
})

describe("GET /inflight", () => {
  it("serves GET only — POST /inflight falls through to the upstream forwarder", async () => {
    const res = await fetch(`${base}/inflight`, { method: "POST", body: "x" })
    expect(await res.text()).toBe("upstream-default")
  })
})

describe("unix-socket listener", () => {
  it("serves the shared handler over the unix socket, creates the socket on boot, removes it on stop", async () => {
    const sockDir = mkdtempSync(join("/var/tmp", "oauth-proxy-unix-"))
    const unixSocketPath = join(sockDir, "oauth-proxy.sock")
    const uProxy = startOAuthProxy({
      oauth,
      port: 0,
      logPrefix: "[unix-test]",
      unixSocketPath,
    })
    try {
      expect(existsSync(unixSocketPath)).toBe(true)
      const res = await fetch("http://localhost/inflight", { unix: unixSocketPath })
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        inFlight: 0,
        heldCount: 0,
        oldestHeldMs: null,
      })
    } finally {
      uProxy.stop()
    }
    expect(existsSync(unixSocketPath)).toBe(false)
  })

  it("still binds the TCP port when a unix socket is also requested", () => {
    const sockDir = mkdtempSync(join("/var/tmp", "oauth-proxy-unix-"))
    const unixSocketPath = join(sockDir, "oauth-proxy.sock")
    const uProxy = startOAuthProxy({ oauth, port: 0, logPrefix: "[unix-test-tcp]", unixSocketPath })
    try {
      expect(uProxy.port).toBeGreaterThan(0)
    } finally {
      uProxy.stop()
    }
  })
})
