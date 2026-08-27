
import { describe, expect, test } from "bun:test"
import {
  isForcedToolChoiceRejection,
  rewriteForcedToolChoiceToAuto,
} from "../lib/model-gateway/forced-tool-choice.ts"
import { shape } from "../lib/shape.ts"

const DecodedRequestSchema = shape.record(shape.string(), shape.unknown())

const FORCED_TOOL_CHOICE_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "invalid_request_error",
    message: "tool_choice forces tool use is not compatible with this model.",
  },
  request_id: "req_011CbyrmjtpRxxxA7AmoMD92",
})

function encodeText(text: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

function encode(value: unknown): ArrayBuffer {
  return encodeText(JSON.stringify(value))
}

function decode(buffer: ArrayBuffer | null): Record<string, unknown> {
  if (buffer == null) throw new Error("expected a rewritten body, got null")
  return DecodedRequestSchema.parse(JSON.parse(new TextDecoder().decode(buffer)))
}

describe("isForcedToolChoiceRejection", () => {
  test("matches 400 + invalid_request_error with the forced-tool_choice message", () => {
    expect(isForcedToolChoiceRejection(400, FORCED_TOOL_CHOICE_BODY)).toBe(true)
  })

  test("matches when upstream drops the trailing period (prefix match)", () => {
    const body = JSON.stringify({
      type: "error",
      error: {
        type: "invalid_request_error",
        message: "tool_choice forces tool use is not compatible with this model",
      },
    })
    expect(isForcedToolChoiceRejection(400, body)).toBe(true)
  })

  test("does not match non-400 statuses even with the matching body", () => {
    expect(isForcedToolChoiceRejection(403, FORCED_TOOL_CHOICE_BODY)).toBe(false)
    expect(isForcedToolChoiceRejection(429, FORCED_TOOL_CHOICE_BODY)).toBe(false)
  })

  test("does not match other invalid_request_error messages", () => {
    const body = JSON.stringify({
      type: "error",
      error: { type: "invalid_request_error", message: "max_tokens: must be greater than 0" },
    })
    expect(isForcedToolChoiceRejection(400, body)).toBe(false)
  })

  test("does not match other error types", () => {
    const body = JSON.stringify({
      type: "error",
      error: {
        type: "permission_error",
        message: "tool_choice forces tool use is not compatible with this model.",
      },
    })
    expect(isForcedToolChoiceRejection(400, body)).toBe(false)
  })

  test("does not match when message is absent", () => {
    const body = JSON.stringify({ type: "error", error: { type: "invalid_request_error" } })
    expect(isForcedToolChoiceRejection(400, body)).toBe(false)
  })

  test("does not match non-JSON or non-envelope bodies", () => {
    expect(isForcedToolChoiceRejection(400, "<html>Bad Request</html>")).toBe(false)
    expect(isForcedToolChoiceRejection(400, "")).toBe(false)
    expect(isForcedToolChoiceRejection(400, JSON.stringify({ ok: true }))).toBe(false)
  })
})

describe("rewriteForcedToolChoiceToAuto", () => {
  test("rewrites tool_choice type=tool to auto, preserving sibling fields", () => {
    const request = {
      model: "claude-fable-5",
      max_tokens: 1024,
      stream: true,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
      tool_choice: { type: "tool", name: "web_search" },
      messages: [{ role: "user", content: "Perform a web search for the query: x" }],
    }
    const rewritten = rewriteForcedToolChoiceToAuto(encode(request))
    expect(decode(rewritten)).toEqual({
      ...request,
      tool_choice: { type: "auto" },
    })
  })

  test("rewrites tool_choice type=any to auto", () => {
    const rewritten = rewriteForcedToolChoiceToAuto(
      encode({ model: "m", tool_choice: { type: "any" }, messages: [] })
    )
    expect(decode(rewritten)).toEqual({
      model: "m",
      tool_choice: { type: "auto" },
      messages: [],
    })
  })

  test("returns null when tool_choice is already auto", () => {
    expect(
      rewriteForcedToolChoiceToAuto(encode({ model: "m", tool_choice: { type: "auto" } }))
    ).toBeNull()
  })

  test("returns null when tool_choice is none", () => {
    expect(
      rewriteForcedToolChoiceToAuto(encode({ model: "m", tool_choice: { type: "none" } }))
    ).toBeNull()
  })

  test("returns null when tool_choice is absent", () => {
    expect(rewriteForcedToolChoiceToAuto(encode({ model: "m", messages: [] }))).toBeNull()
  })

  test("returns null for a non-JSON body", () => {
    expect(rewriteForcedToolChoiceToAuto(encodeText("not json"))).toBeNull()
  })
})
