import { describe, expect, it } from "bun:test"

import {
  isTransientTransportError,
  pullFirstChunkAndWrap,
  withTransportRetry,
} from "../lib/model-gateway/retry.ts"

describe("isTransientTransportError — carried from packages/agents/oauth-proxy/src/oauth-proxy-retry.unit.test.ts", () => {
  it.each([
    "The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()",
    "socket close",
    "Connection reset by peer",
    "ECONNRESET",
    "Unexpected EOF before response body",
    "EPIPE: broken pipe",
    "Network unreachable",
    "The operation timed out",
  ])("classifies %p as transient", (msg) => {
    expect(isTransientTransportError(new TypeError(msg))).toBe(true)
  })

  it("rejects DOMException AbortError even with a transport-looking message", () => {
    const err = new DOMException("The operation timed out", "AbortError")
    expect(isTransientTransportError(err)).toBe(false)
  })

  it("rejects plain Error with transport-looking message", () => {
    expect(isTransientTransportError(new Error("connection reset"))).toBe(false)
  })

  it("rejects TypeError with unrelated message", () => {
    expect(isTransientTransportError(new TypeError("Cannot read properties of undefined"))).toBe(
      false
    )
  })

  it("rejects non-Error values", () => {
    expect(isTransientTransportError(null)).toBe(false)
    expect(isTransientTransportError(undefined)).toBe(false)
    expect(isTransientTransportError("connection reset")).toBe(false)
    expect(isTransientTransportError({ message: "connection reset" })).toBe(false)
  })
})

describe("withTransportRetry", () => {
  const noSleep = (_ms: number): Promise<void> => Promise.resolve()

  it("returns the op result on first success without sleeping", async () => {
    let sleeps = 0
    const tracker = (_ms: number): Promise<void> => {
      sleeps += 1
      return Promise.resolve()
    }
    const result = await withTransportRetry(
      () => Promise.resolve(42),
      "[t]",
      "ok",
      [10, 20],
      tracker
    )
    expect(result).toBe(42)
    expect(sleeps).toBe(0)
  })

  it("retries a transient TypeError and succeeds on the second attempt", async () => {
    let attempts = 0
    const op = (): Promise<string> => {
      attempts += 1
      if (attempts === 1) throw new TypeError("connection reset")
      return Promise.resolve("ok")
    }
    const result = await withTransportRetry(op, "[t]", "first-retry-wins", [10, 20], noSleep)
    expect(result).toBe("ok")
    expect(attempts).toBe(2)
  })

  it("exhausts retries and re-throws the final transient error", async () => {
    let attempts = 0
    const final = new TypeError("socket connection was closed unexpectedly")
    const op = (): Promise<never> => {
      attempts += 1
      throw final
    }
    await expect(withTransportRetry(op, "[t]", "exhaust", [10, 20], noSleep)).rejects.toBe(final)
    expect(attempts).toBe(3)
  })

  it("propagates non-transient errors immediately without retry", async () => {
    let attempts = 0
    const fatal = new Error("not a transport error")
    const op = (): Promise<never> => {
      attempts += 1
      throw fatal
    }
    await expect(withTransportRetry(op, "[t]", "fatal", [10, 20], noSleep)).rejects.toBe(fatal)
    expect(attempts).toBe(1)
  })

  it("propagates AbortError immediately without retry", async () => {
    let attempts = 0
    const abort = new DOMException("The operation timed out", "AbortError")
    const op = (): Promise<never> => {
      attempts += 1
      throw abort
    }
    await expect(withTransportRetry(op, "[t]", "abort", [10, 20], noSleep)).rejects.toBe(abort)
    expect(attempts).toBe(1)
  })

  it("uses the supplied backoff schedule", async () => {
    const sleeps: number[] = []
    const tracker = (ms: number): Promise<void> => {
      sleeps.push(ms)
      return Promise.resolve()
    }
    let attempts = 0
    const op = (): Promise<string> => {
      attempts += 1
      if (attempts < 3) throw new TypeError("ECONNRESET")
      return Promise.resolve("ok")
    }
    const result = await withTransportRetry(op, "[t]", "backoff", [50, 250], tracker)
    expect(result).toBe("ok")
    expect(sleeps).toEqual([50, 250])
  })
})

describe("pullFirstChunkAndWrap", () => {
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

  it("returns null when body is null", async () => {
    expect(await pullFirstChunkAndWrap(null)).toBeNull()
  })

  it("forwards all chunks of a multi-chunk body in order", async () => {
    const a = new Uint8Array([1, 2])
    const b = new Uint8Array([3, 4])
    const c = new Uint8Array([5])
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([a, b, c]))
    expect(wrapped).not.toBeNull()
    if (wrapped == null) throw new Error("unreachable")
    const out = await drain(wrapped)
    expect(out).toEqual([a, b, c])
  })

  it("emits an empty stream cleanly when upstream is empty", async () => {
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([]))
    if (wrapped == null) throw new Error("unreachable")
    const out = await drain(wrapped)
    expect(out).toEqual([])
  })

  it("re-throws transient errors raised on the first-chunk read", async () => {
    const err = new TypeError("connection reset")
    await expect(pullFirstChunkAndWrap(streamThatThrowsOnFirstRead(err))).rejects.toBe(err)
  })

  it("propagates mid-stream errors via controller.error to the consumer", async () => {
    const a = new Uint8Array([1])
    const err = new TypeError("socket close")
    const wrapped = await pullFirstChunkAndWrap(streamThatThrowsAfter([a], err))
    if (wrapped == null) throw new Error("unreachable")
    await expect(drain(wrapped)).rejects.toBe(err)
  })

  it("does not throw when cancel runs after the wrapped stream is fully drained", async () => {
    const wrapped = await pullFirstChunkAndWrap(streamFromChunks([new Uint8Array([1])]))
    if (wrapped == null) throw new Error("unreachable")
    await drain(wrapped)
    await expect(wrapped.cancel()).resolves.toBeUndefined()
  })
})
