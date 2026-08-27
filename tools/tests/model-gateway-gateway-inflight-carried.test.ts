import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"
import { startOAuthProxy } from "../lib/model-gateway/gateway.ts"
import { shape } from "../lib/shape.ts"

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

const InFlightBodySchema = shape.object({
  inFlight: shape.number().int().nonnegative(),
  heldCount: shape.number().int().nonnegative(),
  oldestHeldMs: shape.number().int().nonnegative().nullable(),
})

async function readInFlight(baseUrl: string): Promise<number> {
  const res = await fetch(`${baseUrl}/inflight`)
  expect(res.status).toBe(200)
  return InFlightBodySchema.parse(await res.json()).inFlight
}

async function waitForCount(baseUrl: string, expected: number, timeoutMs = 2_000): Promise<number> {
  const deadline = Date.now() + timeoutMs
  while (true) {
    const count = await readInFlight(baseUrl)
    if (count === expected || Date.now() > deadline) return count
    await Bun.sleep(10)
  }
}

function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let resolve: (value: T) => void = () => undefined
  const promise = new Promise<T>((r) => {
    resolve = r
  })
  return { promise, resolve }
}

function decodeBody(init?: RequestInit): string {
  if (init?.body instanceof ArrayBuffer) return new TextDecoder().decode(init.body)
  return ""
}

function heldOpenUpstream(): {
  enqueue: (text: string) => void
  close: () => void
  response: () => Response
} {
  let controller: ReadableStreamDefaultController<Uint8Array> | null = null
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c
    },
  })
  const encoder = new TextEncoder()
  return {
    enqueue: (text) => {
      try {
        controller?.enqueue(encoder.encode(text))
      } catch {}
    },
    close: () => {
      try {
        controller?.close()
      } catch {}
    },
    response: () =>
      new Response(stream, { status: 200, headers: { "content-type": "text/event-stream" } }),
  }
}

function requireBody(res: Response): ReadableStream<Uint8Array> {
  const body = res.body
  if (body == null) throw new Error("expected a streaming response body")
  return body
}

async function expectCountHolds(baseUrl: string, expected: number): Promise<void> {
  for (let i = 0; i < 5; i++) {
    expect(await readInFlight(baseUrl)).toBe(expected)
    await Bun.sleep(20)
  }
}

describe("in-flight counting", () => {
  it("counts a /v1/messages request while in flight and drains to zero on completion", async () => {
    const gate = deferred<Response>()
    upstreamImpl = () => gate.promise
    const post = fetch(`${base}/v1/messages`, { method: "POST", body: "{}" })
    expect(await waitForCount(base, 1)).toBe(1)
    gate.resolve(new Response("event: message_stop\n\nok", { status: 200 }))
    const res = await post
    expect(res.status).toBe(200)
    await res.text()
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("balances the non-streaming count_tokens path", async () => {
    const gate = deferred<Response>()
    upstreamImpl = () => gate.promise
    const post = fetch(`${base}/v1/messages/count_tokens`, { method: "POST", body: "{}" })
    expect(await waitForCount(base, 1)).toBe(1)
    gate.resolve(new Response('{"input_tokens":12}', { status: 200 }))
    const res = await post
    expect(await res.text()).toBe('{"input_tokens":12}')
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("decrements exactly once across a 429 rebind (two observers, one request)", async () => {
    pickImpl = async (exclude) => ({
      credential: makeCred(exclude.has("acct-1") ? "acct-2" : "acct-1"),
    })
    const gateB = deferred<Response>()
    let rateLimitedCalls = 0
    upstreamImpl = async (_input, init) => {
      if (decodeBody(init) === "request-b") return gateB.promise
      rateLimitedCalls += 1
      if (rateLimitedCalls === 1) return new Response("rate limited", { status: 429 })
      return new Response("ok-after-rebind", { status: 200 })
    }
    const postB = fetch(`${base}/v1/messages`, { method: "POST", body: "request-b" })
    expect(await waitForCount(base, 1)).toBe(1)
    const resA = await fetch(`${base}/v1/messages`, { method: "POST", body: "request-a" })
    expect(resA.status).toBe(200)
    expect(await resA.text()).toBe("ok-after-rebind")
    expect(await readInFlight(base)).toBe(1)
    gateB.resolve(new Response("ok-b", { status: 200 }))
    await (await postB).text()
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("drains via the finally backstop when the handler errors before any observer exists", async () => {
    pickImpl = async () => {
      throw new Error("credential lookup failed")
    }
    const res = await fetch(`${base}/v1/messages`, { method: "POST", body: "{}" })
    expect(res.status).toBe(502)
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("drains when the upstream transport fails before an observer exists (502 path)", async () => {
    upstreamImpl = async () => {
      throw new Error("hard transport failure")
    }
    const res = await fetch(`${base}/v1/messages`, { method: "POST", body: "{}" })
    expect(res.status).toBe(502)
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("tracks full stream duration when getLogDir is unset (counting-only observer)", async () => {
    const bare = startOAuthProxy({ oauth, port: 0, logPrefix: "[inflight-test-bare]" })
    const bareBase = `http://localhost:${bare.port}`
    try {
      const up = heldOpenUpstream()
      upstreamImpl = async () => up.response()
      up.enqueue("event: message_start\n\n")
      const res = await fetch(`${bareBase}/v1/messages`, { method: "POST", body: "{}" })
      expect(res.status).toBe(200)
      const reader = requireBody(res).getReader()
      await reader.read()
      await expectCountHolds(bareBase, 1)
      up.close()
      while (!(await reader.read()).done) {}
      expect(await waitForCount(bareBase, 0)).toBe(0)
    } finally {
      bare.stop()
    }
  })
})
