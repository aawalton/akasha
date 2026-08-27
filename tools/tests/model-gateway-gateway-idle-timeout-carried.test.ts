import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { mkdtempSync } from "node:fs"
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
  async () => ({ credential: makeCred("acct-1") })

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

const logDir = mkdtempSync(join("/var/tmp", "oauth-proxy-idle-"))
const IDLE_MS = 80
const proxy = startOAuthProxy({
  oauth,
  port: 0,
  logPrefix: "[idle-test]",
  getLogDir: () => logDir,
  upstreamIdleTimeoutMs: IDLE_MS,
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

async function postMessages(): Promise<Response> {
  return fetch(`${base}/v1/messages`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model: "claude", messages: [] }),
  })
}

describe("oauth-proxy upstream idle timeout", () => {
  it("aborts a stalled upstream (never sends bytes) and returns a bounded 502", async () => {
    upstreamImpl = (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal
        if (signal == null) return
        signal.addEventListener("abort", () => reject(signal.reason))
      })
    const started = Date.now()
    const res = await postMessages()
    const elapsed = Date.now() - started
    expect(res.status).toBe(502)
    expect(elapsed).toBeLessThan(2_000)
    expect(elapsed).toBeGreaterThanOrEqual(IDLE_MS - 20)
  })

  it("does not abort a healthy, bytes-flowing upstream under the same short bound", async () => {
    upstreamImpl = async () =>
      new Response("event: message_stop\ndata: {}\n\n", {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      })
    const res = await postMessages()
    expect(res.status).toBe(200)
    expect(await res.text()).toContain("message_stop")
  })
})
