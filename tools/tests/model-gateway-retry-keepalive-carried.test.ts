import { describe, expect, it } from "bun:test"

import type { KeepaliveTimers } from "../lib/model-gateway/keepalive.ts"
import type { StreamObserver } from "../lib/model-gateway/retry.ts"
import { pullFirstChunkAndWrap } from "../lib/model-gateway/retry.ts"

const enc = new TextEncoder()
const dec = new TextDecoder()

function makeFakeTimers() {
  const pending = new Map<ReturnType<typeof setTimeout>, () => void>()
  const timers: KeepaliveTimers = {
    set(fn, _ms) {
      const handle = setTimeout(() => {}, 0)
      clearTimeout(handle)
      pending.set(handle, fn)
      return handle
    },
    clear(handle) {
      pending.delete(handle)
    },
  }
  return {
    timers,
    get armedCount() {
      return pending.size
    },
    fire() {
      const entry = [...pending.entries()][0]
      if (entry == null) throw new Error("no armed timer to fire")
      const [handle, fn] = entry
      pending.delete(handle)
      fn()
    },
  }
}

function manualSource() {
  let ctl!: ReadableStreamDefaultController<Uint8Array>
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      ctl = c
    },
  })
  return {
    stream,
    push: (bytes: Uint8Array) => ctl.enqueue(bytes),
    close: () => ctl.close(),
  }
}

function realTick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string[]> {
  const reader = stream.getReader()
  const out: string[] = []
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return out
      if (value !== undefined) out.push(dec.decode(value))
    }
  } finally {
    reader.releaseLock()
  }
}

function makeObserver() {
  let onChunkCount = 0
  let onChunkBytesCount = 0
  const observer: StreamObserver = {
    onChunk: () => (onChunkCount += 1),
    onChunkBytes: () => (onChunkBytesCount += 1),
    onComplete: () => {},
    onUpstreamError: () => {},
    onDownstreamCancel: () => {},
  }
  return {
    observer,
    get onChunkCount() {
      return onChunkCount
    },
    get onChunkBytesCount() {
      return onChunkBytesCount
    },
  }
}

function makeIdle() {
  let resets = 0
  let stops = 0
  return {
    get resets() {
      return resets
    },
    get stops() {
      return stops
    },
    reset() {
      resets += 1
    },
    stop() {
      stops += 1
    },
  }
}

describe("pullFirstChunkAndWrap keepalive injection — carried from packages/agents/oauth-proxy/src/oauth-proxy-retry-keepalive.unit.test.ts", () => {
  it("injects a keepalive comment during silence, between real frames", async () => {
    const fake = makeFakeTimers()
    const src = manualSource()
    src.push(enc.encode("event: x\ndata: 1\n\n"))
    const wrapped = await pullFirstChunkAndWrap(src.stream, undefined, undefined, {
      intervalMs: 1000,
      timers: fake.timers,
    })
    if (wrapped == null) throw new Error("unreachable")
    await realTick()
    expect(fake.armedCount).toBe(1)
    fake.fire()
    src.push(enc.encode("data: 2\n\n"))
    src.close()

    const decoded = await readAll(wrapped)
    expect(decoded).toContain(": keepalive\n")
    expect(decoded.indexOf(": keepalive\n")).toBe(1)
  })

  it("does NOT inject mid-frame (last forwarded byte was not a newline)", async () => {
    const fake = makeFakeTimers()
    const src = manualSource()
    src.push(enc.encode("data: partial"))
    const wrapped = await pullFirstChunkAndWrap(src.stream, undefined, undefined, {
      intervalMs: 1000,
      timers: fake.timers,
    })
    if (wrapped == null) throw new Error("unreachable")
    await realTick()
    fake.fire()
    src.push(enc.encode(" rest\n\n"))
    src.close()

    const decoded = await readAll(wrapped)
    expect(decoded).not.toContain(": keepalive\n")
  })

  it("never arms a timer when keepalive is disabled (intervalMs <= 0)", async () => {
    const fake = makeFakeTimers()
    const src = manualSource()
    src.push(enc.encode("data: 1\n\n"))
    const wrapped = await pullFirstChunkAndWrap(src.stream, undefined, undefined, {
      intervalMs: 0,
      timers: fake.timers,
    })
    if (wrapped == null) throw new Error("unreachable")
    await realTick()
    expect(fake.armedCount).toBe(0)
    src.push(enc.encode("data: 2\n\n"))
    src.close()

    const decoded = await readAll(wrapped)
    expect(decoded).not.toContain(": keepalive\n")
  })

  it("keepalive bytes bypass the observer and do not reset the idle guard", async () => {
    const fake = makeFakeTimers()
    const obs = makeObserver()
    const idle = makeIdle()
    const src = manualSource()
    src.push(enc.encode("data: 1\n\n"))
    const wrapped = await pullFirstChunkAndWrap(src.stream, obs.observer, idle, {
      intervalMs: 1000,
      timers: fake.timers,
    })
    if (wrapped == null) throw new Error("unreachable")
    await realTick()
    const chunkBefore = obs.onChunkCount
    const bytesBefore = obs.onChunkBytesCount
    const resetsBefore = idle.resets

    fake.fire()

    expect(obs.onChunkCount).toBe(chunkBefore)
    expect(obs.onChunkBytesCount).toBe(bytesBefore)
    expect(idle.resets).toBe(resetsBefore)

    src.push(enc.encode("data: 2\n\n"))
    src.close()
    const decoded = await readAll(wrapped)
    expect(decoded).toContain(": keepalive\n")
  })

  it("stops the emitter on normal completion", async () => {
    const fake = makeFakeTimers()
    const src = manualSource()
    src.push(enc.encode("data: 1\n\n"))
    const wrapped = await pullFirstChunkAndWrap(src.stream, undefined, undefined, {
      intervalMs: 1000,
      timers: fake.timers,
    })
    if (wrapped == null) throw new Error("unreachable")
    src.close()
    await readAll(wrapped)
    expect(fake.armedCount).toBe(0)
  })

  it("stops the emitter when the consumer cancels the wrapped stream", async () => {
    const fake = makeFakeTimers()
    const src = manualSource()
    src.push(enc.encode("data: 1\n\n"))
    const wrapped = await pullFirstChunkAndWrap(src.stream, undefined, undefined, {
      intervalMs: 1000,
      timers: fake.timers,
    })
    if (wrapped == null) throw new Error("unreachable")
    await realTick()
    const reader = wrapped.getReader()
    await reader.read()
    reader.releaseLock()
    await wrapped.cancel("client gone")
    expect(fake.armedCount).toBe(0)
  })
})
