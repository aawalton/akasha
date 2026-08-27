
import { describe, expect, test } from "bun:test"
import { classifyRateLimitDeath, sanitizeTranscriptForResume } from "../lib/session-jsonl.ts"
import { shape } from "../lib/shape.ts"

function first<T>(array: readonly T[]): T {
  for (const value of array) return value
  throw new Error("expected at least 1 element, got 0")
}

const SanitizedLineSchema = shape.looseObject({
  message: shape.looseObject({
    content: shape.array(
      shape.looseObject({ type: shape.string(), text: shape.string().optional() })
    ),
  }),
})
const parseSanitizedLine = (text: string) => SanitizedLineSchema.parse(JSON.parse(text))

describe("sanitizeTranscriptForResume", () => {
  test("quarantines an image block from a user message, preserving the sibling text", () => {
    const line = JSON.stringify({
      type: "user",
      message: {
        content: [
          { type: "text", text: "look at this" },
          { type: "image", source: { type: "base64", media_type: "image/png", data: "AAAA" } },
        ],
      },
    })
    const result = sanitizeTranscriptForResume(line)
    expect(result.changed).toBe(true)
    expect(result.quarantined.get("image")).toBe(1)
    const obj = parseSanitizedLine(result.text)
    expect(obj.message.content.map((b: { type: string }) => b.type)).toEqual(["text", "text"])
    expect(first(obj.message.content).text).toBe("look at this")
    expect(obj.message.content.at(1)?.text).toContain("image block removed")
  })

  test("is a no-op when every content block is resume-safe", () => {
    const text = [
      JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "a" }] } }),
      JSON.stringify({
        type: "user",
        message: { content: [{ type: "tool_result", tool_use_id: "tu", content: "ok" }] },
      }),
    ].join("\n")
    const result = sanitizeTranscriptForResume(text)
    expect(result.changed).toBe(false)
    expect(result.text).toBe(text)
    expect(result.quarantined.size).toBe(0)
  })

  test("preserves a user message whose content is a plain string", () => {
    const line = JSON.stringify({ type: "user", message: { content: "ping" } })
    const result = sanitizeTranscriptForResume(line)
    expect(result.changed).toBe(false)
    expect(result.text).toBe(line)
  })

  test("keeps unparseable and non-message lines verbatim", () => {
    const text = ["not json", "", JSON.stringify({ type: "system", foo: 1 }), "  "].join("\n")
    const result = sanitizeTranscriptForResume(text)
    expect(result.changed).toBe(false)
    expect(result.text).toBe(text)
  })

  test("quarantines an all-image content array into non-empty placeholders", () => {
    const line = JSON.stringify({
      type: "user",
      message: {
        content: [
          { type: "image", source: { data: "x" } },
          { type: "image", source: { data: "y" } },
        ],
      },
    })
    const result = sanitizeTranscriptForResume(line)
    expect(result.changed).toBe(true)
    expect(result.quarantined.get("image")).toBe(2)
    const obj = parseSanitizedLine(result.text)
    expect(obj.message.content).toHaveLength(2)
    expect(obj.message.content.every((b: { type: string }) => b.type === "text")).toBe(true)
  })

  test("only rewrites the poisoned line, leaving clean lines byte-identical", () => {
    const cleanLine = JSON.stringify({
      type: "assistant",
      message: { content: [{ type: "text", text: "clean" }] },
    })
    const poisonLine = JSON.stringify({
      type: "user",
      message: { content: [{ type: "image", source: { data: "z" } }] },
    })
    const result = sanitizeTranscriptForResume([cleanLine, poisonLine].join("\n"))
    expect(result.changed).toBe(true)
    const outLines = result.text.split("\n")
    expect(outLines[0]).toBe(cleanLine)
    expect(outLines[1]).not.toBe(poisonLine)
  })

  test("quarantines image blocks inside an assistant message too", () => {
    const line = JSON.stringify({
      type: "assistant",
      message: {
        content: [
          { type: "image", source: { data: "q" } },
          { type: "text", text: "hi" },
        ],
      },
    })
    const result = sanitizeTranscriptForResume(line)
    expect(result.changed).toBe(true)
    expect(result.quarantined.get("image")).toBe(1)
    const obj = parseSanitizedLine(result.text)
    expect(obj.message.content.map((b: { type: string }) => b.type)).toEqual(["text", "text"])
  })
})

describe("classifyRateLimitDeath", () => {
  const death = JSON.stringify({
    type: "assistant",
    isApiErrorMessage: true,
    apiErrorStatus: 429,
    error: "rate_limit",
    message: {
      model: "<synthetic>",
      content: [
        { type: "text", text: "You've hit your weekly limit · resets 3am (America/Denver)" },
      ],
    },
  })
  const healthy = JSON.stringify({
    type: "assistant",
    message: { model: "claude-opus-4-8", content: [{ type: "text", text: "done" }] },
  })
  const syntheticServerError = JSON.stringify({
    type: "assistant",
    isApiErrorMessage: true,
    error: "server_error",
    message: { model: "<synthetic>", content: [{ type: "text", text: "server error" }] },
  })
  const userLine = JSON.stringify({ type: "user", message: { content: "resume please" } })

  test("last assistant line is a 429 death → true", () => {
    expect(classifyRateLimitDeath(`${healthy}\n${death}`)).toBe(true)
  })

  test("healthy last assistant → false", () => {
    expect(classifyRateLimitDeath(`${death}\n${healthy}`)).toBe(false)
  })

  test("synthetic server_error (no apiErrorStatus) → false — keys on 429, not <synthetic>", () => {
    expect(classifyRateLimitDeath(syntheticServerError)).toBe(false)
  })

  test("recovered: mid-session death then a later normal assistant turn → false", () => {
    expect(classifyRateLimitDeath(`${death}\n${userLine}\n${healthy}`)).toBe(false)
  })

  test("death followed by a user nudge (no new assistant turn yet) → still true", () => {
    expect(classifyRateLimitDeath(`${death}\n${userLine}`)).toBe(true)
  })

  test("empty / assistant-less transcripts → false", () => {
    expect(classifyRateLimitDeath("")).toBe(false)
    expect(classifyRateLimitDeath(userLine)).toBe(false)
  })
})
