
import { describe, expect, test } from "bun:test"
import { isFableRequest } from "../lib/model-gateway/fable-fallback.ts"

function encodeText(text: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

function encode(value: unknown): ArrayBuffer {
  return encodeText(JSON.stringify(value))
}

describe("isFableRequest", () => {
  test("matches the fable wire model", () => {
    expect(isFableRequest(encode({ model: "claude-fable-5", messages: [] }))).toBe(true)
  })

  test("matches fable kin by prefix (future dated/successor ids)", () => {
    expect(isFableRequest(encode({ model: "claude-fable-5-20260601" }))).toBe(true)
    expect(isFableRequest(encode({ model: "claude-fable-6" }))).toBe(true)
  })

  test("does not match opus, sonnet, or haiku models", () => {
    for (const model of ["claude-opus-4-8", "claude-sonnet-5", "claude-haiku-4-5"]) {
      expect(isFableRequest(encode({ model }))).toBe(false)
    }
  })

  test("does not match when model is absent or not a string", () => {
    expect(isFableRequest(encode({ messages: [] }))).toBe(false)
    expect(isFableRequest(encode({ model: 42 }))).toBe(false)
  })

  test("does not match a null buffer (GET-style request) or non-JSON body", () => {
    expect(isFableRequest(null)).toBe(false)
    expect(isFableRequest(encodeText("not json"))).toBe(false)
  })
})
