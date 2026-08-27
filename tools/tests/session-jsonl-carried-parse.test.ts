
import { describe, expect, test } from "bun:test"
import { parseSessionLine } from "../lib/session-jsonl.ts"
import { shape } from "../lib/shape.ts"

function first<T>(array: readonly T[]): T {
  for (const value of array) return value
  throw new Error("expected at least 1 element, got 0")
}

describe("parseSessionLine", () => {
  test("parses an assistant message with text content", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: { content: [{ type: "text", text: "hello" }] },
    })
    const msg = parseSessionLine(line)
    expect(msg?.type).toBe("assistant")
    if (msg?.type !== "assistant") throw new Error("narrow")
    const block0 = first(msg.message.content)
    expect(block0.type).toBe("text")
    if (block0.type !== "text") throw new Error("narrow")
    expect(block0.text).toBe("hello")
  })

  test("parses an assistant message with mixed content blocks", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: {
        content: [
          { type: "thinking", thinking: "considering options" },
          { type: "text", text: "answer" },
          { type: "tool_use", id: "tu_1", name: "Read", input: { path: "/x" } },
        ],
      },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("expected assistant")
    expect(msg.message.content.map((b) => b.type)).toEqual(["thinking", "text", "tool_use"])
  })

  test("parses a tool_use_summary message", () => {
    const line = JSON.stringify({ type: "tool_use_summary", summary: "ran 3 tools" })
    const msg = parseSessionLine(line)
    expect(msg?.type).toBe("tool_use_summary")
    if (msg?.type !== "tool_use_summary") throw new Error("narrow")
    expect(msg.summary).toBe("ran 3 tools")
  })

  test("parses a result message with errors", () => {
    const line = JSON.stringify({ type: "result", subtype: "error", errors: ["boom", "again"] })
    const msg = parseSessionLine(line)
    if (msg?.type !== "result") throw new Error("narrow")
    expect(msg.subtype).toBe("error")
    expect(msg.errors).toEqual(["boom", "again"])
  })

  test("parses a result message without errors", () => {
    const line = JSON.stringify({ type: "result", subtype: "success" })
    const msg = parseSessionLine(line)
    if (msg?.type !== "result") throw new Error("narrow")
    expect(msg.subtype).toBe("success")
    expect(msg.errors).toBeUndefined()
  })

  test("parses a user message with string content", () => {
    const line = JSON.stringify({ type: "user", message: { content: "ping" } })
    const msg = parseSessionLine(line)
    if (msg?.type !== "user") throw new Error("narrow")
    expect(msg.message.content).toBe("ping")
  })

  test("parses a user message with array content (tool_result block)", () => {
    const line = JSON.stringify({
      type: "user",
      message: {
        content: [{ type: "tool_result", tool_use_id: "tu_1", content: "/x exists", is_error: false }],
      },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "user") throw new Error("narrow")
    if (typeof msg.message.content === "string") throw new Error("expected array")
    expect(first(msg.message.content).type).toBe("tool_result")
  })

  test("returns null for invalid JSON", () => {
    expect(parseSessionLine("not json")).toBeNull()
    expect(parseSessionLine("{")).toBeNull()
  })

  test("returns null for non-object JSON", () => {
    expect(parseSessionLine("null")).toBeNull()
    expect(parseSessionLine("42")).toBeNull()
    expect(parseSessionLine('"string"')).toBeNull()
    expect(parseSessionLine("[]")).toBeNull()
  })

  test("returns null for unknown message type", () => {
    expect(parseSessionLine(JSON.stringify({ type: "system_init", session_id: "x" }))).toBeNull()
  })

  test("returns null when type field is missing or non-string", () => {
    expect(parseSessionLine(JSON.stringify({ message: {} }))).toBeNull()
    expect(parseSessionLine(JSON.stringify({ type: 42 }))).toBeNull()
  })

  test("returns null for a result line without a subtype (foreign JSONL discriminator collision)", () => {
    const line = JSON.stringify({
      type: "result",
      key: "v2:abc",
      agentId: "a1",
      result: { chapter: 1, ok: true },
    })
    expect(parseSessionLine(line)).toBeNull()
    expect(parseSessionLine(JSON.stringify({ type: "result", subtype: 42 }))).toBeNull()
  })

  test("preserves unknown fields on known messages (loose objects)", () => {
    const line = JSON.stringify({
      type: "assistant",
      session_id: "abc",
      uuid: "def",
      message: { id: "msg_1", content: [{ type: "text", text: "hi", citations: [] }] },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("narrow")
    const extras = shape
      .looseObject({
        session_id: shape.string(),
        message: shape.looseObject({ id: shape.string() }),
      })
      .parse(msg)
    expect(extras.session_id).toBe("abc")
    expect(extras.message.id).toBe("msg_1")
  })

  test("surfaces top-level timestamp on an assistant line as a typed string", () => {
    const line = JSON.stringify({
      type: "assistant",
      timestamp: "2026-05-06T11:00:00.123Z",
      message: { content: [{ type: "text", text: "hi" }] },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("narrow")
    expect(msg.timestamp).toBe("2026-05-06T11:00:00.123Z")
  })

  test("surfaces message.id, message.model, and message.usage on an assistant line", () => {
    const line = JSON.stringify({
      type: "assistant",
      timestamp: "2026-05-06T11:00:00.000Z",
      message: {
        id: "msg_test01",
        model: "claude-sonnet-4-5-20250929",
        content: [{ type: "text", text: "hi" }],
        usage: {
          input_tokens: 3,
          output_tokens: 7,
          cache_creation_input_tokens: 100,
          cache_read_input_tokens: 5000,
        },
      },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("narrow")
    expect(msg.message.id).toBe("msg_test01")
    expect(msg.message.model).toBe("claude-sonnet-4-5-20250929")
    expect(msg.message.usage?.input_tokens).toBe(3)
    expect(msg.message.usage?.output_tokens).toBe(7)
    expect(msg.message.usage?.cache_creation_input_tokens).toBe(100)
    expect(msg.message.usage?.cache_read_input_tokens).toBe(5000)
  })

  test("tolerates assistant message with no usage / id / model (older transcripts)", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: { content: [{ type: "text", text: "hi" }] },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("narrow")
    expect(msg.message.id).toBeUndefined()
    expect(msg.message.model).toBeUndefined()
    expect(msg.message.usage).toBeUndefined()
    expect(msg.timestamp).toBeUndefined()
  })

  test("preserves nested cache_creation breakdown on message.usage", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: {
        id: "msg_cc",
        content: [{ type: "text", text: "x" }],
        usage: {
          input_tokens: 1,
          output_tokens: 1,
          cache_creation_input_tokens: 12852,
          cache_read_input_tokens: 0,
          cache_creation: { ephemeral_5m_input_tokens: 0, ephemeral_1h_input_tokens: 12852 },
        },
      },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("narrow")
    expect(msg.message.usage?.cache_creation?.ephemeral_1h_input_tokens).toBe(12852)
    expect(msg.message.usage?.cache_creation?.ephemeral_5m_input_tokens).toBe(0)
  })

  test("throws on shape drift within a known type (assistant missing message)", () => {
    expect(() => parseSessionLine(JSON.stringify({ type: "assistant" }))).toThrow()
  })

  test("throws on shape drift within a known type (tool_use_summary missing summary)", () => {
    expect(() => parseSessionLine(JSON.stringify({ type: "tool_use_summary" }))).toThrow()
  })

  test("throws on shape drift within a known type (result.errors not string array)", () => {
    const line = JSON.stringify({ type: "result", subtype: "error", errors: [1, 2, 3] })
    expect(() => parseSessionLine(line)).toThrow()
  })

  test("throws on shape drift within a known type (user.message.content wrong type)", () => {
    const line = JSON.stringify({ type: "user", message: { content: 42 } })
    expect(() => parseSessionLine(line)).toThrow()
  })

  test("throws on shape drift in an assistant content block (tool_use missing name)", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: { content: [{ type: "tool_use", id: "tu_1", input: {} }] },
    })
    expect(() => parseSessionLine(line)).toThrow()
  })

  test("preserves an unrecognized content block kind (forward-compat, no throw)", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: {
        content: [
          { type: "text", text: "before" },
          { type: "image", source: { type: "base64", media_type: "image/png", data: "xx" } },
        ],
      },
    })
    const msg = parseSessionLine(line)
    if (msg?.type !== "assistant") throw new Error("expected assistant")
    expect(msg.message.content.map((b) => b.type)).toEqual(["text", "image"])
    const imageBlock = shape
      .looseObject({ type: shape.string(), source: shape.looseObject({ data: shape.string() }) })
      .parse(msg.message.content[1])
    expect(imageBlock.source.data).toBe("xx")
  })
})
