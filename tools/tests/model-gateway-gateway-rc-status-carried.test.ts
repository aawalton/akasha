import { afterAll, describe, expect, it } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { startOAuthProxy } from "../lib/model-gateway/gateway.ts"
import { shape } from "../lib/shape.ts"

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

const logDir = mkdtempSync(join("/var/tmp", "oauth-proxy-rc-log-"))

afterAll(() => {
  globalThis.fetch = realFetch
})

function heldOpenUpstream(): {
  enqueue: (t: string) => void
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

const RcStatusBodySchema = shape.object({ rcConnections: shape.number().int().nonnegative() }).strict()

async function readRcStatus(baseUrl: string): Promise<number> {
  const res = await fetch(`${baseUrl}/rc-status`)
  expect(res.status).toBe(200)
  return RcStatusBodySchema.parse(await res.json()).rcConnections
}

async function waitForRc(baseUrl: string, expected: number, timeoutMs = 2_000): Promise<number> {
  const deadline = Date.now() + timeoutMs
  while (true) {
    const count = await readRcStatus(baseUrl)
    if (count === expected || Date.now() > deadline) return count
    await Bun.sleep(10)
  }
}

async function expectRcHolds(baseUrl: string, expected: number): Promise<void> {
  for (let i = 0; i < 5; i++) {
    expect(await readRcStatus(baseUrl)).toBe(expected)
    await Bun.sleep(20)
  }
}

function startRcProxy(): { proxy: ReturnType<typeof startOAuthProxy>; unixSocketPath: string } {
  const sockDir = mkdtempSync(join("/var/tmp", "oauth-proxy-rc-"))
  const unixSocketPath = join(sockDir, "oauth-proxy.sock")
  const proxy = startOAuthProxy({
    port: 0,
    logPrefix: "[rc-test]",
    unixSocketPath,
    getLogDir: () => logDir,
  })
  return { proxy, unixSocketPath }
}

describe("GET /rc-status — RC-connection sensor", () => {
  it("returns 200 with {rcConnections: 0} when idle, over both TCP and the unix socket", async () => {
    const { proxy, unixSocketPath } = startRcProxy()
    try {
      const tcp = await fetch(`http://localhost:${proxy.port}/rc-status`)
      expect(tcp.status).toBe(200)
      expect(tcp.headers.get("content-type")).toContain("application/json")
      expect(await tcp.json()).toEqual({ rcConnections: 0 })

      const unix = await fetch("http://localhost/rc-status", { unix: unixSocketPath })
      expect(await unix.json()).toEqual({ rcConnections: 0 })
    } finally {
      proxy.stop()
    }
  })

  it("counts a held-open RC request on the unix socket and drains to zero on close", async () => {
    const { proxy, unixSocketPath } = startRcProxy()
    const base = `http://localhost:${proxy.port}`
    const up = heldOpenUpstream()
    upstreamImpl = async () => up.response()
    up.enqueue("event: ping\n\n")
    try {
      const res = await fetch("http://localhost/v1/models", { unix: unixSocketPath })
      expect(res.status).toBe(200)
      const reader = requireBody(res).getReader()
      await reader.read()
      await expectRcHolds(base, 1)
      up.close()
      while (!(await reader.read()).done) {}
      expect(await waitForRc(base, 0)).toBe(0)
    } finally {
      up.close()
      proxy.stop()
    }
  })

  it("does NOT count a passthrough request that arrived over TCP (unix listener only)", async () => {
    const { proxy, unixSocketPath } = startRcProxy()
    const base = `http://localhost:${proxy.port}`
    const up = heldOpenUpstream()
    upstreamImpl = async () => up.response()
    up.enqueue("event: ping\n\n")
    try {
      const res = await fetch(`${base}/v1/models`)
      const reader = requireBody(res).getReader()
      await reader.read()
      await expectRcHolds(base, 0)
      const unix = await fetch("http://localhost/rc-status", { unix: unixSocketPath })
      expect(await unix.json()).toEqual({ rcConnections: 0 })
      up.close()
      while (!(await reader.read()).done) {}
    } finally {
      up.close()
      proxy.stop()
    }
  })
})
