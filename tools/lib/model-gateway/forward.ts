import { fetchWithIdleGuard } from "./idle-timeout.ts"
import type { ObserverSlot } from "./observer-slot.ts"
import { copyRequestHeaders, copyResponseHeaders } from "./proxy-headers.ts"
import { pullFirstChunkAndWrap } from "./retry.ts"
import { buildStreamObserver, type ShutdownFlushRegistry } from "./transport-log.ts"

const UPSTREAM_BASE = "https://api.anthropic.com"

export type Forward = (
  incoming: Request,
  accessToken: string | null,
  bodyBuffer: ArrayBuffer | null,
  account: string | null,
  observerSlot: ObserverSlot
) => Promise<Response>

export function buildForward(deps: {
  idleTimeoutMs: number
  downstreamKeepaliveMs: number
  getLogDir: (() => string) | undefined
  shutdownRegistry: ShutdownFlushRegistry
  logPrefix: string
}): Forward {
  const { idleTimeoutMs, downstreamKeepaliveMs, getLogDir, shutdownRegistry, logPrefix } = deps

  return async function forward(
    incoming: Request,
    accessToken: string | null,
    bodyBuffer: ArrayBuffer | null,
    account: string | null,
    observerSlot: ObserverSlot
  ): Promise<Response> {
    const url = new URL(incoming.url)
    const upstreamUrl = `${UPSTREAM_BASE}${url.pathname}${url.search}`

    const headers = copyRequestHeaders(incoming)
    if (accessToken != null) {
      headers.set("authorization", `Bearer ${accessToken}`)
    } else {
      const orig = incoming.headers.get("authorization")
      if (orig != null) headers.set("authorization", orig)
    }

    const applyIdle =
      idleTimeoutMs > 0 &&
      (url.pathname === "/v1/messages" || url.pathname === "/v1/messages/count_tokens")
    const observerStartMs = Date.now()
    const { response: upstream, idle } = await fetchWithIdleGuard(
      upstreamUrl,
      { method: incoming.method, headers, body: bodyBuffer },
      applyIdle
        ? { idleMs: idleTimeoutMs, logPrefix, label: `${account ?? "-"} ${url.pathname}` }
        : null
    )

    const observer =
      getLogDir != null || observerSlot.endInFlight != null
        ? buildStreamObserver({
            account,
            path: url.pathname,
            startMs: observerStartMs,
            getLogDir,
            shutdownRegistry,
          })
        : undefined
    observerSlot.current = observer ?? null
    observer?.onUpstreamStatus?.(upstream.status, Date.now())

    const isEventStream = (upstream.headers.get("content-type") ?? "").includes("text/event-stream")
    const keepaliveMs = downstreamKeepaliveMs > 0 && isEventStream ? downstreamKeepaliveMs : 0

    const wrappedBody = await pullFirstChunkAndWrap(
      upstream.body,
      observer,
      idle,
      keepaliveMs > 0 ? { intervalMs: keepaliveMs } : undefined,
      isEventStream
    )
    return new Response(wrappedBody, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: copyResponseHeaders(upstream),
    })
  }
}
