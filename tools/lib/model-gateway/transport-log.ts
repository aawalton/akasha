import { appendFileSync } from "node:fs"
import { basename, join } from "node:path"
import type { Infer } from "@akasha/utils-narrow/shape-core"
import { seatNameForAgent } from "../../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import { type LogWriter, logWriter } from "../log-append.ts"
import { shape } from "../shape.ts"
import type { StreamObserver } from "./retry.ts"

const TRANSPORT_SOURCE = "supervisor-transport"

const writers = new Map<string, LogWriter | null>()

function writerFor(dir: string): LogWriter | null {
  const held = writers.get(dir)
  if (held !== undefined) return held
  const seatName = seatNameForAgent(basename(dir))
  const made = seatName === null ? null : logWriter(TRANSPORT_SOURCE, seatName)
  writers.set(dir, made)
  return made
}

export type ObservedStreamState = {
  termination:
    | "complete"
    | "upstream_error"
    | "downstream_cancel"
    | "client_disconnect"
    | "proxy_shutdown"
  account: string
  path: string
  startMs: number
  endMs: number
  framesUpstream: number
  bytesUpstream: number
  lastFrameMs: number
  lastEventType: string | null
  sawMessageStop: boolean
  httpStatus: number | null
  heldMs?: number | null
  emptyPoolReason?: string | null
  error?: unknown
}

export const TransportEventSchema = shape.object({
  ts: shape.string(),
  termination: shape.enum([
    "complete",
    "upstream_error",
    "downstream_cancel",
    "client_disconnect",
    "proxy_shutdown",
  ]),
  account: shape.string(),
  path: shape.string(),
  elapsedMs: shape.number(),
  framesUpstream: shape.number().int().nonnegative(),
  bytesUpstream: shape.number().int().nonnegative(),
  lastFrameAgoMs: shape.number(),
  lastEventType: shape.string().nullable(),
  sawMessageStop: shape.boolean(),
  httpStatus: shape.number().int().nullable(),
  errorClass: shape.string().nullable(),
  errorMessage: shape.string().nullable(),
  heldMs: shape.number().nullable().optional(),
  emptyPoolReason: shape.string().nullable().optional(),
})
export type TransportEvent = Infer<typeof TransportEventSchema>

export function buildTransportEvent(state: ObservedStreamState): TransportEvent {
  const { error } = state
  let errorClass: string | null
  let errorMessage: string | null
  if (error == null) {
    errorClass = null
    errorMessage = null
  } else if (error instanceof Error) {
    errorClass = error.constructor.name
    errorMessage = error.message
  } else {
    errorClass = typeof error
    errorMessage = String(error)
  }
  return {
    ts: new Date(state.endMs).toISOString(),
    termination: state.termination,
    account: state.account,
    path: state.path,
    elapsedMs: state.endMs - state.startMs,
    framesUpstream: state.framesUpstream,
    bytesUpstream: state.bytesUpstream,
    lastFrameAgoMs: state.endMs - state.lastFrameMs,
    lastEventType: state.lastEventType,
    sawMessageStop: state.sawMessageStop,
    httpStatus: state.httpStatus,
    errorClass,
    errorMessage,
    heldMs: state.heldMs ?? null,
    emptyPoolReason: state.emptyPoolReason ?? null,
  }
}

const SSE_EVENT_LINE = /(?:^|\n)event:[ \t]*([^\r\n]*?)[ \t]*(?:\r?\n|$)/g

// ONE DECODER RATHER THAN ONE PER FRAME. Decoding without `stream` carries nothing between calls,
// so a shared decoder reads exactly as a fresh one does and allocates nothing on the hottest path
// this process has.
const DECODER = new TextDecoder()

export function decodedChunk(chunk: Uint8Array): string {
  return DECODER.decode(chunk)
}

export function extractLastSseEventTypeIn(text: string): string | null {
  let last: string | null = null
  SSE_EVENT_LINE.lastIndex = 0
  for (const match of text.matchAll(SSE_EVENT_LINE)) {
    last = match[1] ?? ""
  }
  return last
}

export function recordTransportEvent(event: TransportEvent, getLogDir: () => string): undefined {
  try {
    const dir = getLogDir()
    const writer = writerFor(dir)
    if (writer !== null) {
      writer.write({
        "written-at": event.ts,
        "agent-id": basename(dir),
        level: event.termination,
        text: event.path,
        data: event,
      })
      if (writer.refused() === null) return
    }
    appendFileSync(join(dir, "supervisor-transport.jsonl"), `${JSON.stringify(event)}\n`)
  } catch {}
}

const SSE_MESSAGE_STOP = /(?:^|\n)event:[ \t]*message_stop\b/

export type ArmableStreamObserver = StreamObserver & {
  armTerminal: (fn: () => void) => undefined
}

export function buildStreamObserver(args: {
  account: string | null
  path: string
  startMs: number
  getLogDir?: (() => string) | undefined
  shutdownRegistry?: ShutdownFlushRegistry
}): ArmableStreamObserver {
  const { account, path, startMs, getLogDir, shutdownRegistry } = args
  let framesUpstream = 0
  let bytesUpstream = 0
  let lastFrameMs = startMs
  let lastEventType: string | null = null
  let sawMessageStop = false
  let httpStatus: number | null = null
  let terminated = false
  let onTerminalFn: (() => void) | null = null
  const accountLabel = account ?? "-"
  let unregister: (() => void) | null = null
  function emit(
    termination:
      | "complete"
      | "upstream_error"
      | "downstream_cancel"
      | "client_disconnect"
      | "proxy_shutdown",
    error?: unknown
  ): undefined {
    if (terminated) return
    terminated = true
    if (unregister) {
      unregister()
      unregister = null
    }
    onTerminalFn?.()
    if (getLogDir != null) {
      recordTransportEvent(
        buildTransportEvent({
          termination,
          account: accountLabel,
          path,
          startMs,
          endMs: Date.now(),
          framesUpstream,
          bytesUpstream,
          lastFrameMs,
          lastEventType,
          sawMessageStop,
          httpStatus,
          error,
        }),
        getLogDir
      )
    }
  }
  const observer: ArmableStreamObserver = {
    onChunk(bytes, atMs) {
      framesUpstream += 1
      bytesUpstream += bytes
      lastFrameMs = atMs
    },
    // ONE DECODE SERVES BOTH SCANS. This runs for every SSE frame on every stream a gateway
    // carries, and Claude's frames are token-sized, so it is the hottest path in the process.
    // Decoding the same bytes twice — once to read the event type and again to look for the stop —
    // spent the event loop badly enough that `/healthz` could not be reached inside a second, and
    // the supervisor read a working gateway as a dead one and killed it every thirty seconds.
    onChunkBytes(chunk) {
      if (chunk.byteLength === 0) return
      const text = decodedChunk(chunk)
      const ev = extractLastSseEventTypeIn(text)
      if (ev != null) lastEventType = ev
      if (!sawMessageStop && SSE_MESSAGE_STOP.test(text)) {
        sawMessageStop = true
      }
    },
    onUpstreamStatus(status) {
      httpStatus = status
    },
    onComplete() {
      emit("complete")
    },
    onUpstreamError(err) {
      emit("upstream_error", err)
    },
    onDownstreamCancel(reason) {
      emit("downstream_cancel", reason)
    },
    onClientDisconnect(reason) {
      emit("client_disconnect", reason)
    },
    onProxyShutdown(reason) {
      emit("proxy_shutdown", reason)
    },
    armTerminal(fn) {
      if (terminated) {
        fn()
        return
      }
      onTerminalFn = fn
    },
  }
  if (shutdownRegistry != null) {
    unregister = shutdownRegistry.register(observer)
  }
  return observer
}

export type ShutdownFlushRegistry = {
  register: (observer: StreamObserver) => () => void
  flushAll: (reason: string) => void
}

export function buildShutdownFlushRegistry(): ShutdownFlushRegistry {
  const observers = new Set<StreamObserver>()
  return {
    register(observer) {
      observers.add(observer)
      return () => {
        observers.delete(observer)
      }
    },
    flushAll(reason) {
      const atMs = Date.now()
      for (const obs of observers) {
        obs.onProxyShutdown?.(reason, atMs)
      }
      observers.clear()
    },
  }
}
