import { classifyCommittedServed, mapStatusToSseError } from "@akasha/agents/committed-outcome"
import type { HoldRegistry } from "@akasha/agents/hold-registry"
import {
  buildKeepaliveEmitter,
  DEFAULT_DOWNSTREAM_KEEPALIVE_MS,
  KEEPALIVE_COMMENT_BYTES,
  type KeepaliveEmitter,
  type KeepaliveTimers,
} from "@akasha/agents/keepalive"
import type { ObserverSlot } from "./observer-slot.ts"
import { runPickPipeline } from "./pick-pipeline.ts"
import type { PickPipelineDeps, PickPipelineOutcome } from "./pick-pipeline-types.ts"
import { buildAnthropicSseErrorFrame } from "./sse-error-frame.ts"
import {
  buildStreamObserver,
  buildTransportEvent,
  type ObservedStreamState,
  recordTransportEvent,
} from "./transport-log.ts"

export const DEFAULT_HOLD_POLL_MS = 2000

const COMMITTED_SSE_HEADERS: Record<string, string> = {
  "content-type": "text/event-stream; charset=utf-8",
  "cache-control": "no-cache",
  connection: "keep-alive",
}

export function buildCommittedKeepaliveResponse(args: {
  req: Request
  observerSlot: ObserverSlot
  originalBody: ArrayBuffer | null
  method: string
  pathname: string
  deps: PickPipelineDeps
  sleep: (ms: number) => Promise<void>
  keepaliveMs?: number
  holdPollMs?: number
  timers?: KeepaliveTimers
  holdRegistry?: HoldRegistry
  getLogDir?: () => string
  emptyPoolReason?: string
  runAttempt?: () => Promise<PickPipelineOutcome>
}): Response {
  const { req, observerSlot, originalBody, method, pathname, deps, sleep } = args
  const { logPrefix } = deps
  const keepaliveMs = args.keepaliveMs ?? DEFAULT_DOWNSTREAM_KEEPALIVE_MS
  const holdPollMs = args.holdPollMs ?? DEFAULT_HOLD_POLL_MS
  const runAttempt =
    args.runAttempt ??
    (() => runPickPipeline({ req, observerSlot, originalBody, method, pathname, deps }))

  const committedStartMs = Date.now()
  const committedObserver = buildStreamObserver({
    account: "-",
    path: pathname,
    startMs: committedStartMs,
  })
  observerSlot.current = committedObserver

  const holdHandle = args.holdRegistry?.enter(committedStartMs)
  const releaseHold = (): undefined => {
    if (holdHandle != null) args.holdRegistry?.exit(holdHandle)
  }
  let spliceStartMs: number | null = null
  let terminalFired = false
  const finishHold = (termination: ObservedStreamState["termination"], atMs: number): undefined => {
    if (terminalFired) return
    terminalFired = true
    const heldMs = (spliceStartMs ?? atMs) - committedStartMs
    const { getLogDir } = args
    if (getLogDir != null) {
      recordTransportEvent(
        buildTransportEvent({
          termination,
          account: "-",
          path: pathname,
          startMs: committedStartMs,
          endMs: atMs,
          framesUpstream: 0,
          bytesUpstream: 0,
          lastFrameMs: committedStartMs,
          lastEventType: null,
          sawMessageStop: false,
          httpStatus: null,
          heldMs,
          emptyPoolReason: args.emptyPoolReason ?? null,
        }),
        getLogDir
      )
    }
  }

  let closed = false
  let disconnected = false
  // The reader is spelled as what `Response.body.getReader()` answers rather than as
  // `ReadableStreamDefaultReader<Uint8Array>`, which under `@types/bun` demands a `readMany` the
  // web reader a fetch response hands back does not carry.
  let activeReader: ReturnType<NonNullable<Response["body"]>["getReader"]> | null = null
  // THE EMITTER IS REACHED FROM `cancel` RATHER THAN FROM `start` ALONE. A cancel sets `closed`
  // before `finishComplete` runs, so `finishComplete` returns at its first line and the `stop()`
  // inside it is never reached; and `fire()` re-arms itself for as long as `stopped` is false.
  // Held open that way, one disconnected client leaves a timer firing every 3500ms for the life of
  // the process, its closure holding that request's whole body.
  let heartbeatHandle: KeepaliveEmitter | null = null

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const safeEnqueue = (bytes: Uint8Array): undefined => {
        if (closed) return
        try {
          controller.enqueue(bytes)
        } catch {
          closed = true
        }
      }
      const heartbeat = buildKeepaliveEmitter(
        keepaliveMs,
        () => safeEnqueue(KEEPALIVE_COMMENT_BYTES),
        args.timers
      )
      heartbeatHandle = heartbeat

      const finishComplete = (): undefined => {
        if (closed) return
        closed = true
        heartbeat.stop()
        try {
          controller.close()
        } catch {}
        const endMs = Date.now()
        committedObserver.onComplete(endMs)
        finishHold("complete", endMs)
        releaseHold()
      }

      const spliceBody = async (res: Response): Promise<undefined> => {
        const body = res.body
        if (body == null) return
        const reader = body.getReader()
        activeReader = reader
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (closed || disconnected) {
              await reader.cancel().catch(() => {})
              break
            }
            if (value != null) safeEnqueue(value)
          }
        } catch {
        } finally {
          activeReader = null
        }
      }

      const orchestrate = async (): Promise<undefined> => {
        safeEnqueue(KEEPALIVE_COMMENT_BYTES)
        if (keepaliveMs > 0) heartbeat.reset()
        console.log(`${logPrefix} committed-keepalive ${method} ${pathname} phase=hold-open`)

        while (!closed && !disconnected) {
          const outcome = await runAttempt()
          if (closed || disconnected) break

          if (outcome.kind === "served") {
            const res = outcome.response
            if (classifyCommittedServed(res.status) === "splice") {
              spliceStartMs = Date.now()
              heartbeat.stop()
              console.log(
                `${logPrefix} committed-keepalive ${method} ${pathname} phase=splice status=${res.status} heldMs=${spliceStartMs - committedStartMs}`
              )
              await spliceBody(res)
              finishComplete()
              return
            }
            await res.body?.cancel().catch(() => {})
            const { errorType, message } = mapStatusToSseError(res.status)
            console.log(
              `${logPrefix} committed-keepalive ${method} ${pathname} phase=committed-error status=${res.status} errorType=${errorType} heldMs=${Date.now() - committedStartMs}`
            )
            heartbeat.stop()
            safeEnqueue(buildAnthropicSseErrorFrame(errorType, message))
            finishComplete()
            return
          }

          observerSlot.current = committedObserver
          await sleep(holdPollMs)
        }

        finishComplete()
      }

      // A REJECTION HERE IS THE ONLY PATH OUT OF `orchestrate` THAT ENDS NOTHING. `finishComplete`
      // runs on every other path, and it is what closes the stream, stops the heartbeat and
      // releases the hold. Thrown past, `void` swallows the error and the client is left reading an
      // SSE stream that never carries data and never ends, while the hold ages in `/inflight` and
      // the heartbeat fires on. Measured: after 800ms, heldCount=1 and 16 keepalive comments sent.
      void orchestrate().catch((err) => {
        console.error(
          `${logPrefix} committed-keepalive ${method} ${pathname} phase=failed heldMs=${Date.now() - committedStartMs}`,
          err
        )
        heartbeat.stop()
        safeEnqueue(
          buildAnthropicSseErrorFrame("api_error", "the gateway failed while holding this request")
        )
        finishComplete()
      })
    },
    cancel(): undefined {
      disconnected = true
      closed = true
      heartbeatHandle?.stop()
      const endMs = Date.now()
      void activeReader?.cancel().catch(() => {})
      committedObserver.onDownstreamCancel?.("committed_cancel", endMs)
      finishHold("downstream_cancel", endMs)
      releaseHold()
    },
  })

  return new Response(stream, { status: 200, headers: COMMITTED_SSE_HEADERS })
}
