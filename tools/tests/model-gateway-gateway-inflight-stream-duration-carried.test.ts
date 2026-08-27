import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { mkdtempSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"
import { startOAuthProxy } from "../lib/model-gateway/gateway.ts"
import { TransportEventSchema } from "../lib/model-gateway/transport-log.ts"
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

const InFlightBodySchema = shape.object({ inFlight: shape.number().int().nonnegative() })

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

async function nudgeUntilDrained(
  baseUrl: string,
  up: { enqueue: (text: string) => void },
  timeoutMs = 2_000
): Promise<number> {
  const deadline = Date.now() + timeoutMs
  while (true) {
    const count = await readInFlight(baseUrl)
    if (count === 0 || Date.now() > deadline) return count
    up.enqueue("event: ping\n\n")
    await Bun.sleep(20)
  }
}

describe("stream-duration counting", () => {
  it("keeps the count at 1 after the handler returns while the body is held open mid-stream", async () => {
    const up = heldOpenUpstream()
    upstreamImpl = async () => up.response()
    up.enqueue("event: message_start\n\n")
    const res = await fetch(`${base}/v1/messages`, { method: "POST", body: "{}" })
    expect(res.status).toBe(200)
    const reader = requireBody(res).getReader()
    await reader.read()
    await expectCountHolds(base, 1)
    up.enqueue("event: content_block_delta\n\n")
    await expectCountHolds(base, 1)
    up.close()
    while (!(await reader.read()).done) {}
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("keeps counting the final stream after a 429 rebind discarded an earlier attempt", async () => {
    pickImpl = async (exclude) => ({
      credential: makeCred(exclude.has("acct-1") ? "acct-2" : "acct-1"),
    })
    const up = heldOpenUpstream()
    let calls = 0
    upstreamImpl = async () => {
      calls += 1
      if (calls === 1) return new Response("rate limited", { status: 429 })
      return up.response()
    }
    up.enqueue("event: message_start\n\n")
    const res = await fetch(`${base}/v1/messages`, { method: "POST", body: "{}" })
    expect(res.status).toBe(200)
    const reader = requireBody(res).getReader()
    await reader.read()
    await expectCountHolds(base, 1)
    up.close()
    while (!(await reader.read()).done) {}
    expect(await waitForCount(base, 0)).toBe(0)
  })

  it("drops to 0 when the client aborts mid-stream (req.signal abort)", async () => {
    const up = heldOpenUpstream()
    upstreamImpl = async () => up.response()
    up.enqueue("event: message_start\n\n")
    const aborter = new AbortController()
    const res = await fetch(`${base}/v1/messages`, {
      method: "POST",
      body: "{}",
      signal: aborter.signal,
    })
    const reader = requireBody(res).getReader()
    await reader.read()
    await expectCountHolds(base, 1)
    aborter.abort()
    expect(await nudgeUntilDrained(base, up)).toBe(0)
    up.close()
  })

  it("attributes a handed-off completed stream as complete in the transport JSONL", async () => {
    pickImpl = async () => ({ credential: makeCred("acct-attribution") })
    const up = heldOpenUpstream()
    upstreamImpl = async () => up.response()
    up.enqueue("event: message_start\n\n")
    const res = await fetch(`${base}/v1/messages`, { method: "POST", body: "{}" })
    const reader = requireBody(res).getReader()
    await reader.read()
    up.enqueue("event: message_stop\n\n")
    up.close()
    while (!(await reader.read()).done) {}
    expect(await waitForCount(base, 0)).toBe(0)
    const lines = readFileSync(join(logDir, "supervisor-transport.jsonl"), "utf8")
      .split("\n")
      .filter((l) => l.length > 0)
      .map((l) => TransportEventSchema.parse(JSON.parse(l)))
      .filter((e) => e.account === "acct-attribution")
    expect(lines.length).toBe(1)
    expect(lines[0]?.termination).toBe("complete")
    expect(lines[0]?.framesUpstream).toBeGreaterThanOrEqual(2)
    expect(lines[0]?.sawMessageStop).toBe(true)
  })
})
