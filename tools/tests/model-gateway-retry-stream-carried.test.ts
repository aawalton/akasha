import { describe, expect, it } from "bun:test"

import { pullFirstChunkAndWrap } from "../lib/model-gateway/retry.ts"

function streamFromChunks(chunks: readonly Uint8Array[]): ReadableStream<Uint8Array> {
  let i = 0
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) {
        controller.close()
        return
      }
      const chunk = chunks[i]
      if (chunk !== undefined) controller.enqueue(chunk)
      i += 1
    },
  })
}

function streamThatThrowsAfter(
  chunks: readonly Uint8Array[],
  err: unknown
): ReadableStream<Uint8Array> {
  let i = 0
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) throw err
      const chunk = chunks[i]
      if (chunk !== undefined) controller.enqueue(chunk)
      i += 1
    },
  })
}

async function drain(stream: ReadableStream<Uint8Array>): Promise<void> {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done } = await reader.read()
      if (done) return
    }
  } finally {
    reader.releaseLock()
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

describe("pullFirstChunkAndWrap idle guard — carried from packages/agents/oauth-proxy/src/oauth-proxy-retry-idle.unit.test.ts", () => {
  it("resets on every chunk (activity) and stops once on normal completion", async () => {
    const idle = makeIdle()
    const wrapped = await pullFirstChunkAndWrap(
      streamFromChunks([new Uint8Array([1]), new Uint8Array([2]), new Uint8Array([3])]),
      undefined,
      idle
    )
    if (wrapped == null) throw new Error("unreachable")
    await drain(wrapped)
    expect(idle.resets).toBe(3)
    expect(idle.stops).toBe(1)
  })

  it("stops on a mid-stream upstream error (does not leave the timer armed)", async () => {
    const idle = makeIdle()
    const err = new TypeError("socket close")
    const wrapped = await pullFirstChunkAndWrap(
      streamThatThrowsAfter([new Uint8Array([1])], err),
      undefined,
      idle
    )
    if (wrapped == null) throw new Error("unreachable")
    await expect(drain(wrapped)).rejects.toBe(err)
    expect(idle.resets).toBeGreaterThanOrEqual(1)
    expect(idle.stops).toBe(1)
  })

  it("stops when the FIRST read throws before any byte forwards", async () => {
    const idle = makeIdle()
    const err = new TypeError("connection reset")
    await expect(
      pullFirstChunkAndWrap(
        new ReadableStream<Uint8Array>({
          pull() {
            throw err
          },
        }),
        undefined,
        idle
      )
    ).rejects.toBe(err)
    expect(idle.stops).toBe(1)
  })

  it("stops when the consumer cancels the wrapped stream", async () => {
    const idle = makeIdle()
    const wrapped = await pullFirstChunkAndWrap(
      streamFromChunks([new Uint8Array([1]), new Uint8Array([2])]),
      undefined,
      idle
    )
    if (wrapped == null) throw new Error("unreachable")
    const reader = wrapped.getReader()
    await reader.read()
    reader.releaseLock()
    await wrapped.cancel("client gone")
    expect(idle.stops).toBeGreaterThanOrEqual(1)
  })
})


describe("pullFirstChunkAndWrap observer hook — carried from packages/agents/oauth-proxy/src/oauth-proxy-retry-observer.unit.test.ts", () => {
  function makeRecorder() {
    const chunks: { bytes: number; atMs: number }[] = []
    const completes: number[] = []
    const upstreamErrors: { err: unknown; atMs: number }[] = []
    const downstreamCancels: { reason: unknown; atMs: number }[] = []
    return {
      get chunks(): readonly { bytes: number; atMs: number }[] {
        return chunks
      },
      get completes(): readonly number[] {
        return completes
      },
      get upstreamErrors(): readonly { err: unknown; atMs: number }[] {
        return upstreamErrors
      },
      get downstreamCancels(): readonly { reason: unknown; atMs: number }[] {
        return downstreamCancels
      },
      onChunk(bytes: number, atMs: number) {
        chunks.push({ bytes, atMs })
      },
      onComplete(atMs: number) {
        completes.push(atMs)
      },
      onUpstreamError(err: unknown, atMs: number) {
        upstreamErrors.push({ err, atMs })
      },
      onDownstreamCancel(reason: unknown, atMs: number) {
        downstreamCancels.push({ reason, atMs })
      },
    }
  }

  function streamFromChunks(chunks: readonly Uint8Array[]): ReadableStream<Uint8Array> {
    let i = 0
    return new ReadableStream<Uint8Array>({
      pull(controller) {
        if (i >= chunks.length) {
          controller.close()
          return
        }
        const chunk = chunks[i]
        if (chunk !== undefined) controller.enqueue(chunk)
        i += 1
      },
    })
  }

  function streamThatThrowsOnFirstRead(err: unknown): ReadableStream<Uint8Array> {
    return new ReadableStream<Uint8Array>({
      pull() {
        throw err
      },
    })
  }

  function streamThatThrowsAfter(
    chunks: readonly Uint8Array[],
    err: unknown
  ): ReadableStream<Uint8Array> {
    let i = 0
    return new ReadableStream<Uint8Array>({
      pull(controller) {
        if (i >= chunks.length) throw err
        const chunk = chunks[i]
        if (chunk !== undefined) controller.enqueue(chunk)
        i += 1
      },
    })
  }

  async function drain(stream: ReadableStream<Uint8Array>): Promise<Uint8Array[]> {
    const chunks: Uint8Array[] = []
    const reader = stream.getReader()
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) return chunks
        chunks.push(value)
      }
    } finally {
      reader.releaseLock()
    }
  }

  it("calls onChunk once per chunk in order with byte length and timestamp", async () => {
    const a = new Uint8Array([1, 2])
    const b = new Uint8Array([3, 4, 5])
    const c = new Uint8Array([6])
    const rec = makeRecorder()
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([a, b, c]), rec)
    if (wrapped == null) throw new Error("unreachable")
    await drain(wrapped)
    expect(rec.chunks.map((c) => c.bytes)).toEqual([2, 3, 1])
    for (let i = 1; i < rec.chunks.length; i++) {
      const prev = rec.chunks[i - 1]
      const cur = rec.chunks[i]
      if (prev === undefined || cur === undefined) throw new Error("unreachable")
      expect(cur.atMs).toBeGreaterThanOrEqual(prev.atMs)
    }
  })

  it("calls onComplete exactly once on a normal upstream completion", async () => {
    const a = new Uint8Array([1, 2])
    const b = new Uint8Array([3])
    const rec = makeRecorder()
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([a, b]), rec)
    if (wrapped == null) throw new Error("unreachable")
    await drain(wrapped)
    expect(rec.completes.length).toBe(1)
    expect(rec.upstreamErrors.length).toBe(0)
    expect(rec.downstreamCancels.length).toBe(0)
  })

  it("calls onUpstreamError when the FIRST read throws and re-throws to caller", async () => {
    const err = new TypeError("connection reset")
    const rec = makeRecorder()
    await expect(pullFirstChunkAndWrap(streamThatThrowsOnFirstRead(err), rec)).rejects.toBe(err)
    expect(rec.upstreamErrors.length).toBe(1)
    expect(rec.upstreamErrors[0]?.err).toBe(err)
    expect(rec.completes.length).toBe(0)
    expect(rec.chunks.length).toBe(0)
  })

  it("calls onUpstreamError when a MID-STREAM read throws (after onChunk for prior chunks)", async () => {
    const a = new Uint8Array([1])
    const err = new TypeError("socket close")
    const rec = makeRecorder()
    const wrapped = await pullFirstChunkAndWrap(streamThatThrowsAfter([a], err), rec)
    if (wrapped == null) throw new Error("unreachable")
    await expect(drain(wrapped)).rejects.toBe(err)
    expect(rec.chunks.length).toBeGreaterThanOrEqual(1)
    expect(rec.upstreamErrors.length).toBe(1)
    expect(rec.upstreamErrors[0]?.err).toBe(err)
    expect(rec.completes.length).toBe(0)
  })

  it("calls onDownstreamCancel when the consumer cancels the wrapped stream mid-stream", async () => {
    const a = new Uint8Array([1])
    const b = new Uint8Array([2])
    const c = new Uint8Array([3])
    const rec = makeRecorder()
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([a, b, c]), rec)
    if (wrapped == null) throw new Error("unreachable")
    const reader = wrapped.getReader()
    try {
      const first = await reader.read()
      expect(first.done).toBe(false)
    } finally {
      reader.releaseLock()
    }
    await wrapped.cancel("test reason")
    expect(rec.downstreamCancels.length).toBe(1)
    expect(rec.downstreamCancels[0]?.reason).toBe("test reason")
    expect(rec.completes.length).toBe(0)
    expect(rec.upstreamErrors.length).toBe(0)
  })

  it("preserves all existing behavior when no observer is passed (multi-chunk forward)", async () => {
    const a = new Uint8Array([1, 2])
    const b = new Uint8Array([3, 4])
    const c = new Uint8Array([5])
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([a, b, c]))
    if (wrapped == null) throw new Error("unreachable")
    const out = await drain(wrapped)
    expect(out).toEqual([a, b, c])
  })

  it("never breaks the wrapped stream when an observer callback throws", async () => {
    const a = new Uint8Array([1, 2])
    const b = new Uint8Array([3])
    const c = new Uint8Array([4, 5])
    const rec = makeRecorder()
    const throwingObserver = {
      ...rec,
      onChunk(bytes: number, atMs: number) {
        rec.onChunk(bytes, atMs)
        throw new Error("observer onChunk exploded")
      },
    }
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([a, b, c]), throwingObserver)
    if (wrapped == null) throw new Error("unreachable")
    const out = await drain(wrapped)
    expect(out).toEqual([a, b, c])
    expect(rec.completes.length).toBe(1)
  })
})
