import { describe, expect, it } from "bun:test"
import {
  base64urlToBytes,
  bitWriterToBytes,
  bytesToBase64url,
  makeBitReader,
  makeBitWriter,
  readBits,
  writeBits,
} from "./binary-utils"

describe("BitWriter and BitReader", () => {
  it("should round-trip single bits", () => {
    const writer = makeBitWriter()
    writeBits(writer, 1, 1)
    writeBits(writer, 0, 1)
    writeBits(writer, 1, 1)
    writeBits(writer, 1, 1)

    const bytes = bitWriterToBytes(writer)
    const reader = makeBitReader(bytes)

    expect(readBits(reader, 1)).toBe(1)
    expect(readBits(reader, 1)).toBe(0)
    expect(readBits(reader, 1)).toBe(1)
    expect(readBits(reader, 1)).toBe(1)
  })

  it("should round-trip multi-bit values", () => {
    const writer = makeBitWriter()
    writeBits(writer, 7, 3)
    writeBits(writer, 5, 4)
    writeBits(writer, 255, 8)
    writeBits(writer, 1000, 10)

    const bytes = bitWriterToBytes(writer)
    const reader = makeBitReader(bytes)

    expect(readBits(reader, 3)).toBe(7)
    expect(readBits(reader, 4)).toBe(5)
    expect(readBits(reader, 8)).toBe(255)
    expect(readBits(reader, 10)).toBe(1000)
  })

  it("should handle cross-byte boundaries", () => {
    const writer = makeBitWriter()
    writeBits(writer, 0b111, 3)
    writeBits(writer, 0b11111111111, 11)

    const bytes = bitWriterToBytes(writer)
    const reader = makeBitReader(bytes)

    expect(readBits(reader, 3)).toBe(0b111)
    expect(readBits(reader, 11)).toBe(0b11111111111)
  })
})

describe("base64url encoding", () => {
  it("should round-trip bytes", () => {
    const original = new Uint8Array([0, 127, 255, 48, 100, 200])
    const encoded = bytesToBase64url(original)
    const decoded = base64urlToBytes(encoded)

    expect(decoded).toEqual(original)
  })

  it("should produce URL-safe characters", () => {
    const bytes = new Uint8Array([251, 255, 191])
    const encoded = bytesToBase64url(bytes)

    expect(encoded).not.toContain("+")
    expect(encoded).not.toContain("/")
    expect(encoded).not.toContain("=")
  })

  it("should return null for invalid input", () => {
    expect(base64urlToBytes("!!!invalid!!!")).toBeNull()
  })
})
