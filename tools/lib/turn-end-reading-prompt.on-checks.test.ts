import { describe, expect, test } from "bun:test"
import { extractStreamText } from "./turn-end-reading-prompt.ts"

function sse(frames: ReadonlyArray<Record<string, unknown>>): string {
  return frames.map((f) => `event: ${String(f.type)}\ndata: ${JSON.stringify(f)}\n\n`).join("")
}

function textDelta(text: string): Record<string, unknown> {
  return { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } }
}

describe("extractStreamText", () => {
  test("joins the text deltas of a streamed answer in order", () => {
    const body = sse([
      { type: "message_start", message: { id: "msg_1" } },
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      textDelta('{"line": "", '),
      textDelta('"why": "", "verdict": "allow"}'),
      { type: "content_block_stop", index: 0 },
      { type: "message_stop" },
    ])
    expect(extractStreamText(body)).toBe('{"line": "", "why": "", "verdict": "allow"}')
  })

  test("reads a stream the gateway held open, ignoring its keepalive comments", () => {
    const body = `: keepalive\n: keepalive\n${sse([textDelta("held then served")])}`
    expect(extractStreamText(body)).toBe("held then served")
  })

  test("answers nothing for an error frame rather than the text around it", () => {
    const body =
      sse([textDelta("partial")]) +
      'event: error\ndata: {"type":"error","error":{"type":"rate_limit_error","message":"x"}}\n\n'
    expect(extractStreamText(body)).toBeNull()
  })

  test("answers nothing for a stream that carried no text", () => {
    expect(extractStreamText(sse([{ type: "message_stop" }]))).toBeNull()
    expect(extractStreamText(": keepalive\n")).toBeNull()
    expect(extractStreamText("")).toBeNull()
  })

  test("steps over a frame it cannot parse rather than losing the stream", () => {
    const body = `data: {not json\n\n${sse([textDelta("kept")])}`
    expect(extractStreamText(body)).toBe("kept")
  })

  test("takes only text deltas, never another block's delta", () => {
    const body = sse([
      { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "no" } },
      textDelta("yes"),
    ])
    expect(extractStreamText(body)).toBe("yes")
  })
})
