
import { describe, expect, test } from "bun:test"
import {
  isExtendedContextRequest,
  rewriteModelToStrippedSibling,
} from "../lib/model-gateway/extended-context-fallback.ts"
import { shape } from "../lib/shape.ts"
import { type Infer } from "../lib/shape-core"

function encodeRaw(text: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

function buf(obj: unknown): ArrayBuffer {
  return encodeRaw(JSON.stringify(obj))
}

const DecodedSchema = shape.looseObject({ model: shape.string().optional() })

function decode(b: ArrayBuffer): Infer<typeof DecodedSchema> {
  return DecodedSchema.parse(JSON.parse(new TextDecoder().decode(b)))
}

describe("isExtendedContextRequest", () => {
  test("true only when the body model carries the [1m] suffix", () => {
    expect(isExtendedContextRequest(buf({ model: "claude-fable-5[1m]" }))).toBe(true)
    expect(isExtendedContextRequest(buf({ model: "claude-opus-4-8[1m]" }))).toBe(true)
    expect(isExtendedContextRequest(buf({ model: "claude-fable-5" }))).toBe(false)
    expect(isExtendedContextRequest(buf({ model: "opus" }))).toBe(false)
  })

  test("false for null body, absent model, or non-JSON body", () => {
    expect(isExtendedContextRequest(null)).toBe(false)
    expect(isExtendedContextRequest(buf({ messages: [] }))).toBe(false)
    expect(isExtendedContextRequest(encodeRaw("not json"))).toBe(false)
  })
})

describe("rewriteModelToStrippedSibling", () => {
  test("strips the [1m] suffix, preserving every sibling field", () => {
    const rewritten = rewriteModelToStrippedSibling(
      buf({ model: "claude-fable-5[1m]", messages: [{ role: "user" }], max_tokens: 100 })
    )
    if (rewritten === null) throw new Error("expected a rewritten body")
    expect(decode(rewritten)).toEqual({
      model: "claude-fable-5",
      messages: [{ role: "user" }],
      max_tokens: 100,
    })
  })

  test("works across logical families", () => {
    const rewritten = rewriteModelToStrippedSibling(buf({ model: "claude-opus-4-8[1m]" }))
    if (rewritten === null) throw new Error("expected a rewritten body")
    expect(decode(rewritten)).toEqual({
      model: "claude-opus-4-8",
    })
  })

  test("returns null (fail-open) for a non-[1m] model", () => {
    expect(rewriteModelToStrippedSibling(buf({ model: "claude-fable-5" }))).toBeNull()
  })

  test("returns null for an absent model or a non-JSON body", () => {
    expect(rewriteModelToStrippedSibling(buf({ messages: [] }))).toBeNull()
    expect(rewriteModelToStrippedSibling(encodeRaw("not json"))).toBeNull()
  })
})
