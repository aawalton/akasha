import { mkdirSync, rmSync } from "node:fs"
import { dirname } from "node:path"
import type { Server } from "bun"
import { REFRESH_BUFFER_MS } from "../oauth-constants.ts"
import { realOAuthEffects } from "../oauth-effects.ts"
import type { OAuthCredential } from "../oauth-types.ts"
import { buildAccountPicker } from "./account-picker.ts"
import { bindWithRetry } from "./bind-with-retry.ts"
import { buildForward } from "./forward.ts"
import { buildHoldRegistry } from "./hold-registry.ts"
import { buildMessageHandler } from "./message-handler.ts"
import { buildEndInFlightOnce, type ObserverSlot } from "./observer-slot.ts"
import { buildShutdownFlushRegistry } from "./transport-log.ts"
import type { OAuthProxy, StartOAuthProxyOptions } from "./types.ts"


export type InFlightTracker = {
  begin: () => void
  end: () => void
  whenIdle: (timeoutMs: number) => Promise<{ idle: boolean }>
  getCount: () => number
}

export function buildInFlightTracker(): InFlightTracker {
  let count = 0
  const waiters: Array<(result: { idle: boolean }) => void> = []
  function begin(): undefined {
    count += 1
  }
  function end(): undefined {
    if (count <= 0) {
      count = 0
      return
    }
    count -= 1
    if (count === 0 && waiters.length > 0) {
      const pending = waiters.splice(0)
      for (const w of pending) w({ idle: true })
    }
  }
  function whenIdle(timeoutMs: number): Promise<{ idle: boolean }> {
    if (count === 0) return Promise.resolve({ idle: true })
    return new Promise((resolve) => {
      let settled = false
      const settle = (result: { idle: boolean }): undefined => {
        if (settled) return
        settled = true
        const idx = waiters.indexOf(wrapped)
        if (idx >= 0) waiters.splice(idx, 1)
        resolve(result)
      }
      const wrapped = (result: { idle: boolean }): undefined => settle(result)
      waiters.push(wrapped)
      setTimeout(() => settle({ idle: false }), timeoutMs).unref?.()
    })
  }
  function getCount(): number {
    return count
  }
  return { begin, end, whenIdle, getCount }
}

export function startOAuthProxy(opts: StartOAuthProxyOptions): OAuthProxy {
  const logPrefix = opts.logPrefix ?? "[oauth-proxy]"

  const oauth = opts.oauth ?? realOAuthEffects

  const idleTimeoutMs = opts.upstreamIdleTimeoutMs ?? 0

  const downstreamKeepaliveMs = opts.downstreamKeepaliveMs ?? 0

  const shutdownRegistry = buildShutdownFlushRegistry()

  const inFlight = buildInFlightTracker()

  const holdRegistry = buildHoldRegistry()

  const rcConn = buildInFlightTracker()

  const pickAccount = buildAccountPicker(logPrefix, oauth)

  async function getFreshToken(account: string): Promise<OAuthCredential | null> {
    const cred = await oauth.getCredentialByAccount(account, logPrefix)
    if (!cred) return null
    const now = Date.now()
    if (cred.expiresAt <= now) {
      console.error(
        `${logPrefix} ${account} expired at ${new Date(cred.expiresAt).toISOString()} and nothing here renews one — the walk has not reached it`
      )
      return null
    }
    if (cred.expiresAt < now + REFRESH_BUFFER_MS) {
      console.warn(
        `${logPrefix} ${account} expires at ${new Date(cred.expiresAt).toISOString()}, inside the reader's buffer — the walk is behind`
      )
    }
    return cred
  }

  const forward = buildForward({
    idleTimeoutMs,
    downstreamKeepaliveMs,
    getLogDir: opts.getLogDir,
    shutdownRegistry,
    logPrefix,
  })

  const handleMessages = buildMessageHandler({
    logPrefix,
    pickAccount,
    getFreshToken,
    forward,
    oauth,
    holdRegistry,
    getLogDir: opts.getLogDir,
  })

  let unixServer: Server<undefined> | null = null

  const fetchHandler = async (req: Request, server: Server<undefined>): Promise<Response> => {
    const url = new URL(req.url)
    const hasAuth = req.headers.has("authorization") ? "yes" : "no"
    console.log(`${logPrefix} req ${req.method} ${url.pathname} auth=${hasAuth}`)

    if (req.method === "HEAD" && url.pathname === "/") {
      return new Response(null, { status: 200 })
    }
    if (req.method === "GET" && url.pathname === "/healthz") {
      return new Response("ok", { status: 200 })
    }
    if (req.method === "GET" && url.pathname === "/inflight") {
      return Response.json({
        inFlight: inFlight.getCount(),
        ...holdRegistry.snapshot(Date.now()),
      })
    }
    if (req.method === "GET" && url.pathname === "/rc-status") {
      return Response.json({ rcConnections: rcConn.getCount() })
    }

    if (
      req.method === "POST" &&
      (url.pathname === "/v1/messages" || url.pathname === "/v1/messages/count_tokens")
    ) {
      server.timeout(req, 0)
      inFlight.begin()
      const endInFlight = buildEndInFlightOnce(inFlight.end)
      const observerSlot: ObserverSlot = { current: null, endInFlight }
      req.signal.addEventListener("abort", () => {
        observerSlot.current?.onClientDisconnect?.("client_abort", Date.now())
        endInFlight()
      })
      let handedOff = false
      try {
        const res = await handleMessages(req, observerSlot)
        if (res.body != null && observerSlot.current != null) {
          observerSlot.current.armTerminal(endInFlight)
          handedOff = true
        }
        return res
      } finally {
        if (!handedOff) {
          observerSlot.current?.onClientDisconnect?.("fetch_handler_exit", Date.now())
          observerSlot.current = null
          endInFlight()
        }
      }
    }

    const bodyBuffer = req.body ? await req.arrayBuffer() : null

    if (unixServer != null && server === unixServer) {
      rcConn.begin()
      const endRcConn = buildEndInFlightOnce(rcConn.end)
      const rcSlot: ObserverSlot = { current: null, endInFlight: endRcConn }
      req.signal.addEventListener("abort", () => {
        endRcConn()
      })
      let rcHandedOff = false
      try {
        const res = await forward(req, null, bodyBuffer, null, rcSlot)
        if (res.body != null && rcSlot.current != null) {
          rcSlot.current.armTerminal(endRcConn)
          rcHandedOff = true
        }
        return res
      } finally {
        if (!rcHandedOff) endRcConn()
      }
    }

    const slot: ObserverSlot = { current: null }
    return forward(req, null, bodyBuffer, null, slot)
  }

  const server = bindWithRetry(opts.port, logPrefix, () =>
    Bun.serve({ port: opts.port, fetch: fetchHandler })
  )

  const port = server.port
  if (port === undefined) {
    server.stop()
    throw new Error(`${logPrefix} Bun.serve returned an undefined port`)
  }

  const { unixSocketPath } = opts
  if (unixSocketPath != null) {
    try {
      mkdirSync(dirname(unixSocketPath), { recursive: true })
      rmSync(unixSocketPath, { force: true })
      unixServer = Bun.serve({ unix: unixSocketPath, fetch: fetchHandler })
      console.error(`${logPrefix} remote-control unix socket listening at ${unixSocketPath}`)
    } catch (err) {
      unixServer = null
      console.error(
        `${logPrefix} remote-control unix bind failed (TCP unaffected): ${
          err instanceof Error ? err.message : String(err)
        }`
      )
    }
  }
  console.error(`${logPrefix} listening on http://localhost:${port}`)

  return {
    port,
    stop: () => {
      server.stop()
      if (unixServer != null) {
        try {
          unixServer.stop()
        } finally {
          if (unixSocketPath != null) rmSync(unixSocketPath, { force: true })
        }
      }
    },
    flushAll: (reason) => {
      shutdownRegistry.flushAll(reason)
    },
  }
}
