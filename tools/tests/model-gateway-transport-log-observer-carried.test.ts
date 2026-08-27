import { afterAll, describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import type { StreamObserver } from "../lib/model-gateway/retry.ts"
import {
  buildShutdownFlushRegistry,
  buildStreamObserver,
  recordTransportEvent,
  type TransportEvent,
  TransportEventSchema,
} from "../lib/model-gateway/transport-log.ts"

const made: string[] = []

function scratch(): string {
  const dir = mkdtempSync("/var/tmp/model-gateway-transport-log-carried-")
  made.push(dir)
  return dir
}

afterAll(() => {
  for (const dir of made) rmSync(dir, { recursive: true, force: true })
})

function linesIn(dir: string): string[] {
  return readFileSync(join(dir, "supervisor-transport.jsonl"), "utf8")
    .split("\n")
    .filter((line) => line.length > 0)
}

describe("buildStreamObserver client_disconnect / proxy_shutdown", () => {
  test("emits a client_disconnect record when onClientDisconnect fires before any terminal branch", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onClientDisconnect?.("fetch handler exited", Date.now())
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    const parsed = TransportEventSchema.parse(JSON.parse(lines[0] ?? ""))
    expect(parsed.termination).toBe("client_disconnect")
    expect(parsed.errorMessage).toBe("fetch handler exited")
    expect(parsed.account).toBe("alice")
  })

  test("onClientDisconnect is no-op once any terminal branch has fired (once-set-stays-set)", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onComplete(Date.now())
    observer.onClientDisconnect?.("late call", Date.now())
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    expect(TransportEventSchema.parse(JSON.parse(lines[0] ?? "")).termination).toBe("complete")
  })

  test("emits a proxy_shutdown record when onProxyShutdown fires on an active stream", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "bob",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onProxyShutdown?.("SIGTERM", Date.now())
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    const parsed = TransportEventSchema.parse(JSON.parse(lines[0] ?? ""))
    expect(parsed.termination).toBe("proxy_shutdown")
    expect(parsed.errorMessage).toBe("SIGTERM")
    expect(parsed.account).toBe("bob")
  })

  test("onProxyShutdown is no-op once any terminal branch has fired", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "bob",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onUpstreamError(new TypeError("connection reset"), Date.now())
    observer.onProxyShutdown?.("SIGTERM", Date.now())
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    expect(TransportEventSchema.parse(JSON.parse(lines[0] ?? "")).termination).toBe("upstream_error")
  })
})

describe("buildShutdownFlushRegistry", () => {
  test("registers active observers and flushes them all on shutdown", () => {
    const dir = scratch()
    const registry = buildShutdownFlushRegistry()
    for (const account of ["a", "b"]) {
      registry.register(
        buildStreamObserver({
          account,
          path: "/v1/messages",
          startMs: Date.now(),
          getLogDir: () => dir,
        })
      )
    }
    registry.flushAll("SIGTERM")
    const lines = linesIn(dir)
    expect(lines.length).toBe(2)
    const parsed = lines.map((line) => TransportEventSchema.parse(JSON.parse(line)))
    expect(parsed.every((one) => one.termination === "proxy_shutdown")).toBe(true)
    expect(parsed.map((one) => one.account).sort()).toEqual(["a", "b"])
  })

  test("the unregister callback removes the observer so flushAll skips it", () => {
    const dir = scratch()
    const registry = buildShutdownFlushRegistry()
    const unregister = registry.register(
      buildStreamObserver({
        account: "a",
        path: "/v1/messages",
        startMs: Date.now(),
        getLogDir: () => dir,
      })
    )
    unregister()
    registry.flushAll("SIGTERM")
    expect(() => linesIn(dir)).toThrow()
  })

  test("flushAll clears the registry so a second flushAll is a no-op", () => {
    const dir = scratch()
    const registry = buildShutdownFlushRegistry()
    registry.register(
      buildStreamObserver({
        account: "a",
        path: "/v1/messages",
        startMs: Date.now(),
        getLogDir: () => dir,
      })
    )
    registry.flushAll("SIGTERM")
    registry.flushAll("SIGTERM")
    expect(linesIn(dir).length).toBe(1)
  })
})

describe("buildStreamObserver armTerminal", () => {
  const terminalBranches: ReadonlyArray<{
    name: string
    fire: (observer: StreamObserver) => void
  }> = [
    { name: "complete", fire: (o) => o.onComplete(Date.now()) },
    {
      name: "upstream_error",
      fire: (o) => o.onUpstreamError(new TypeError("connection reset"), Date.now()),
    },
    { name: "downstream_cancel", fire: (o) => o.onDownstreamCancel("cancelled", Date.now()) },
    { name: "client_disconnect", fire: (o) => o.onClientDisconnect?.("rst", Date.now()) },
    { name: "proxy_shutdown", fire: (o) => o.onProxyShutdown?.("SIGTERM", Date.now()) },
  ]

  for (const branch of terminalBranches) {
    test(`fires the armed hook exactly once on ${branch.name}, even when the branch repeats`, () => {
      const dir = scratch()
      let calls = 0
      const observer = buildStreamObserver({
        account: "alice",
        path: "/v1/messages",
        startMs: Date.now(),
        getLogDir: () => dir,
      })
      observer.armTerminal(() => {
        calls += 1
      })
      branch.fire(observer)
      branch.fire(observer)
      expect(calls).toBe(1)
    })
  }

  test("does not re-fire the armed hook when a different terminal branch follows", () => {
    const dir = scratch()
    let calls = 0
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.armTerminal(() => {
      calls += 1
    })
    observer.onComplete(Date.now())
    observer.onClientDisconnect?.("late", Date.now())
    observer.onProxyShutdown?.("SIGTERM", Date.now())
    expect(calls).toBe(1)
  })

  test("fires the armed hook immediately when arming after the observer already terminated", () => {
    const dir = scratch()
    let calls = 0
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onComplete(Date.now())
    observer.armTerminal(() => {
      calls += 1
    })
    expect(calls).toBe(1)
  })

  test("an unarmed observer terminates without firing any hook (discarded retry attempt)", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    expect(() => observer.onDownstreamCancel("429 discard", Date.now())).not.toThrow()
  })

  test("fires the armed hook when the shutdown registry's flushAll terminates the observer", () => {
    const dir = scratch()
    const registry = buildShutdownFlushRegistry()
    let calls = 0
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
      shutdownRegistry: registry,
    })
    observer.armTerminal(() => {
      calls += 1
    })
    registry.flushAll("SIGTERM")
    expect(calls).toBe(1)
  })

  test("skips the JSONL write when getLogDir is unset but still runs the terminal lifecycle", () => {
    let calls = 0
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
    })
    observer.armTerminal(() => {
      calls += 1
    })
    observer.onComplete(Date.now())
    expect(calls).toBe(1)
  })
})

describe("buildStreamObserver httpStatus capture", () => {
  test("threads onUpstreamStatus into the emitted record on complete", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onUpstreamStatus?.(429, Date.now())
    observer.onComplete(Date.now())
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    expect(TransportEventSchema.parse(JSON.parse(lines[0] ?? "")).httpStatus).toBe(429)
  })

  test("emits httpStatus: null when onUpstreamStatus was never called (fetch threw)", () => {
    const dir = scratch()
    const observer = buildStreamObserver({
      account: "alice",
      path: "/v1/messages",
      startMs: Date.now(),
      getLogDir: () => dir,
    })
    observer.onUpstreamError(new TypeError("connection reset"), Date.now())
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    expect(TransportEventSchema.parse(JSON.parse(lines[0] ?? "")).httpStatus).toBeNull()
  })
})

describe("recordTransportEvent", () => {
  function makeEvent(): TransportEvent {
    return {
      ts: "2026-05-03T12:00:00.000Z",
      termination: "complete",
      account: "alice",
      path: "/v1/messages",
      elapsedMs: 1500,
      framesUpstream: 12,
      bytesUpstream: 4096,
      lastFrameAgoMs: 50,
      lastEventType: "message_stop",
      sawMessageStop: true,
      httpStatus: 200,
      errorClass: null,
      errorMessage: null,
    }
  }

  test("writes one valid JSON line ending in \\n to supervisor-transport.jsonl", () => {
    const dir = scratch()
    const event = makeEvent()
    expect(recordTransportEvent(event, () => dir)).toBeUndefined()
    const contents = readFileSync(join(dir, "supervisor-transport.jsonl"), "utf8")
    expect(contents.endsWith("\n")).toBe(true)
    const lines = linesIn(dir)
    expect(lines.length).toBe(1)
    expect(TransportEventSchema.parse(JSON.parse(lines[0] ?? ""))).toEqual(event)
  })

  test("appends (does not truncate) on a second call", () => {
    const dir = scratch()
    recordTransportEvent(makeEvent(), () => dir)
    recordTransportEvent({ ...makeEvent(), account: "bob" }, () => dir)
    const lines = linesIn(dir)
    expect(lines.length).toBe(2)
    expect(TransportEventSchema.parse(JSON.parse(lines[0] ?? "")).account).toBe("alice")
    expect(TransportEventSchema.parse(JSON.parse(lines[1] ?? "")).account).toBe("bob")
  })

  test("never throws when getLogDir() returns a non-existent directory", () => {
    const bogus = join(scratch(), "nonexistent-transport-log-dir-xyz", "deeper")
    expect(() => recordTransportEvent(makeEvent(), () => bogus)).not.toThrow()
  })

  test("never throws when getLogDir itself throws", () => {
    expect(() =>
      recordTransportEvent(makeEvent(), () => {
        throw new Error("getter exploded")
      })
    ).not.toThrow()
  })
})
