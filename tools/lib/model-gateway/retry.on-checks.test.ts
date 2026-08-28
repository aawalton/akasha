import { describe, expect, it } from "bun:test"

import { pullFirstChunkAndWrap, type StreamObserver } from "./retry.ts"

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

async function drainText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const decoder = new TextDecoder()
  let out = ""
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return out
      out += decoder.decode(value, { stream: true })
    }
  } finally {
    reader.releaseLock()
  }
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

function lastDataLine(text: string): string {
  const line = text
    .split("\n")
    .filter((l) => l.startsWith("data: "))
    .at(-1)
  if (line === undefined) throw new Error(`no data line in ${JSON.stringify(text)}`)
  return line.substring("data: ".length)
}

const SSE_CHUNK = 'event: content_block_delta\ndata: {"type":"content_block_delta"}\n\n'

describe("pullFirstChunkAndWrap mid-stream SSE error frame", () => {
  it("closes cleanly with a terminal error event instead of erroring the stream", async () => {
    const wrapped = await pullFirstChunkAndWrap(
      streamThatThrowsAfter([bytes(SSE_CHUNK)], new TypeError("socket close")),
      undefined,
      undefined,
      undefined,
      true
    )
    if (wrapped == null) throw new Error("unreachable")
    const text = await drainText(wrapped)
    expect(text).toBe(
      `${SSE_CHUNK}event: error\ndata: {"type":"error","error":{"type":"api_error","message":"Upstream connection failed after the response committed to a stream: socket close"}}\n\n`
    )
  })

  it("names the transport failure in an Anthropic-shaped error envelope", async () => {
    const wrapped = await pullFirstChunkAndWrap(
      streamThatThrowsAfter([bytes(SSE_CHUNK)], new TypeError("ECONNRESET")),
      undefined,
      undefined,
      undefined,
      true
    )
    if (wrapped == null) throw new Error("unreachable")
    expect(JSON.parse(lastDataLine(await drainText(wrapped)))).toEqual({
      type: "error",
      error: {
        type: "api_error",
        message: "Upstream connection failed after the response committed to a stream: ECONNRESET",
      },
    })
  })

  it("restores the line boundary before the frame when upstream stopped mid-line", async () => {
    const partial = 'event: content_block_delta\ndata: {"type":"content_bl'
    const wrapped = await pullFirstChunkAndWrap(
      streamThatThrowsAfter([bytes(partial)], new TypeError("socket close")),
      undefined,
      undefined,
      undefined,
      true
    )
    if (wrapped == null) throw new Error("unreachable")
    const text = await drainText(wrapped)
    expect(text.startsWith(`${partial}\nevent: error\n`)).toBe(true)
    expect(text.endsWith("\n\n")).toBe(true)
  })

  it("still reports the upstream error to the observer", async () => {
    const err = new TypeError("socket close")
    const seen: unknown[] = []
    const observer: StreamObserver = {
      onChunk: () => {},
      onComplete: () => {},
      onUpstreamError: (e) => {
        seen.push(e)
      },
      onDownstreamCancel: () => {},
    }
    const wrapped = await pullFirstChunkAndWrap(
      streamThatThrowsAfter([bytes(SSE_CHUNK)], err),
      observer,
      undefined,
      undefined,
      true
    )
    if (wrapped == null) throw new Error("unreachable")
    await drainText(wrapped)
    expect(seen).toEqual([err])
  })

  it("errors the stream when the frame is not enabled", async () => {
    const err = new TypeError("socket close")
    const wrapped = await pullFirstChunkAndWrap(
      streamThatThrowsAfter([bytes(SSE_CHUNK)], err),
      undefined,
      undefined,
      undefined,
      false
    )
    if (wrapped == null) throw new Error("unreachable")
    await expect(drainText(wrapped)).rejects.toBe(err)
  })

  it("errors the stream when the flag is omitted", async () => {
    const err = new TypeError("socket close")
    const wrapped = await pullFirstChunkAndWrap(streamThatThrowsAfter([bytes(SSE_CHUNK)], err))
    if (wrapped == null) throw new Error("unreachable")
    await expect(drainText(wrapped)).rejects.toBe(err)
  })
})
