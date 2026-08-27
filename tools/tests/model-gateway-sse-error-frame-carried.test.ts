import { describe, expect, it } from "bun:test"
import { buildAnthropicSseErrorFrame } from "../lib/model-gateway/sse-error-frame.ts"
import { shape } from "../lib/shape.ts"
import { type Infer } from "../lib/shape-core"

const SseErrorEnvelopeSchema = shape
  .object({
    type: shape.literal("error"),
    error: shape.object({ type: shape.string(), message: shape.string() }).strict(),
  })
  .strict()

function parseSseDataLine(text: string): Infer<typeof SseErrorEnvelopeSchema> {
  const dataLine = text.split("\n").find((line) => line.startsWith("data: "))
  expect(dataLine).toBeDefined()
  return SseErrorEnvelopeSchema.parse(JSON.parse(dataLine?.substring("data: ".length) ?? ""))
}

describe("buildAnthropicSseErrorFrame", () => {
  it("emits an Anthropic-shaped SSE error event terminated by a blank line", () => {
    const text = new TextDecoder().decode(buildAnthropicSseErrorFrame("api_error", "boom"))
    expect(text).toBe(
      'event: error\ndata: {"type":"error","error":{"type":"api_error","message":"boom"}}\n\n'
    )
  })

  it("round-trips through an SSE data parse to the Anthropic error shape", () => {
    const text = new TextDecoder().decode(
      buildAnthropicSseErrorFrame("overloaded_error", "Overloaded")
    )
    const json = parseSseDataLine(text)
    expect(json).toEqual({
      type: "error",
      error: { type: "overloaded_error", message: "Overloaded" },
    })
  })

  it("JSON-escapes control characters in the message", () => {
    const text = new TextDecoder().decode(buildAnthropicSseErrorFrame("api_error", 'a"b\nc'))
    expect(text.endsWith("\n\n")).toBe(true)
    expect(text.split("\n\n")).toHaveLength(2)
    const json = parseSseDataLine(text)
    expect(json.error.message).toBe('a"b\nc')
  })
})
