import { describe, expect, it } from "bun:test"
import { parseClientStreamFlag } from "../lib/model-gateway/client-stream.ts"

function body(obj: unknown): ArrayBuffer {
  const encoded = new TextEncoder().encode(JSON.stringify(obj))
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

describe("parseClientStreamFlag", () => {
  it("is true only for stream: true", () => {
    expect(parseClientStreamFlag(body({ model: "m", stream: true }))).toBe(true)
  })

  it("is false for stream: false", () => {
    expect(parseClientStreamFlag(body({ stream: false }))).toBe(false)
  })

  it("is false when the flag is absent (conservative default)", () => {
    expect(parseClientStreamFlag(body({ model: "m" }))).toBe(false)
  })

  it("is false for a null body", () => {
    expect(parseClientStreamFlag(null)).toBe(false)
  })

  it("is false for a non-boolean stream value", () => {
    expect(parseClientStreamFlag(body({ stream: "true" }))).toBe(false)
  })

  it("is false for a non-JSON body", () => {
    const raw = new TextEncoder().encode("not json{{{")
    const buf = new ArrayBuffer(raw.byteLength)
    new Uint8Array(buf).set(raw)
    expect(parseClientStreamFlag(buf)).toBe(false)
  })

  it("tolerates unknown sibling fields", () => {
    expect(parseClientStreamFlag(body({ stream: true, metadata: { x: 1 }, tools: [] }))).toBe(true)
  })
})
