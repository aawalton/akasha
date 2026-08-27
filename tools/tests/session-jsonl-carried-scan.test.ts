
import { describe, expect, test } from "bun:test"
import {
  parseSessionLine,
  parseSessionLines,
  readTranscriptSessionId,
} from "../lib/session-jsonl.ts"

const channel = (id: string, body = "hi") =>
  `<channel source="messages" sender="019f411e-cd43-71f9-a5aa-2b384cfe8925" source_type="user" message_id="${id}">\n${body}\n</channel>`

const enqueue = (id: string) =>
  JSON.stringify({ type: "queue-operation", operation: "enqueue", content: channel(id) })
const dequeue = () => JSON.stringify({ type: "queue-operation", operation: "dequeue" })

describe("readTranscriptSessionId", () => {
  test("returns the sessionId from the first line carrying one", () => {
    const text = [
      JSON.stringify({ type: "summary", note: "no session id here" }),
      JSON.stringify({ sessionId: "abc-123", type: "user", message: { content: "hi" } }),
      JSON.stringify({ sessionId: "abc-123", type: "assistant" }),
    ].join("\n")
    expect(readTranscriptSessionId(text)).toBe("abc-123")
  })

  test("returns null when no line carries a sessionId", () => {
    expect(readTranscriptSessionId("")).toBeNull()
    expect(readTranscriptSessionId('{"type":"user"}\n{"type":"assistant"}')).toBeNull()
  })

  test("skips blank and unparseable lines before the first sessionId", () => {
    const text = ["", "not json at all", '{"sessionId":"x-9","type":"user"}'].join("\n")
    expect(readTranscriptSessionId(text)).toBe("x-9")
  })
})

describe("parseSessionLines", () => {
  test("parses a multi-line transcript and skips blank/unknown lines", () => {
    const text = [
      "",
      JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "a" }] } }),
      "  ",
      JSON.stringify({ type: "system_init", session_id: "x" }),
      JSON.stringify({ type: "user", message: { content: "u" } }),
      "not json",
      JSON.stringify({ type: "result", subtype: "success" }),
      "",
    ].join("\n")
    const messages = parseSessionLines(text)
    expect(messages.map((m) => m.type)).toEqual(["assistant", "user", "result"])
  })

  test("returns empty array for empty input", () => {
    expect(parseSessionLines("")).toEqual([])
    expect(parseSessionLines("\n\n  \n")).toEqual([])
  })

  test("propagates shape-drift throws (does not silently swallow)", () => {
    const text = [
      JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "ok" }] } }),
      JSON.stringify({ type: "result", subtype: "error", errors: [1, 2, 3] }),
    ].join("\n")
    expect(() => parseSessionLines(text)).toThrow()
  })

  test("skips (does not throw on) a subtype-less result line mid-stream", () => {
    const text = [
      JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "ok" }] } }),
      JSON.stringify({ type: "result", key: "v2:x", agentId: "a1", result: {} }),
      JSON.stringify({ type: "result", subtype: "success" }),
    ].join("\n")
    expect(parseSessionLines(text).map((m) => m.type)).toEqual(["assistant", "result"])
  })

  test("models queue-operation lines instead of dropping them to null", () => {
    const msg = parseSessionLine(enqueue("019f0000-0000-7000-8000-000000000001"))
    expect(msg?.type).toBe("queue-operation")
    if (msg?.type !== "queue-operation") throw new Error("narrow")
    expect(msg.operation).toBe("enqueue")
    expect(parseSessionLine(dequeue())?.type).toBe("queue-operation")
  })
})

