import { beforeAll, describe, expect, test } from "bun:test"
import { base64urlToBytes, bytesToBase64url } from "./base64url"
import { makeBitReader, readBits } from "./bit-reader"
import { bitsWritten, bitWriterToBytes, makeBitWriter, writeBits } from "./bit-writer"

beforeAll(() => {
  Object.assign(globalThis, {
    BitAnd: (a: number, b: number) => (a & b) >>> 0,
    BitOr: (a: number, b: number) => (a | b) >>> 0,
    BitLShift: (a: number, b: number) => (a << b) >>> 0,
    BitRShift: (a: number, b: number) => a >>> b,
    string: { len: (s: string) => s.length },
  })
})

describe("base64url — known-answer vectors", () => {
  test("single byte packs to two chars", () => {
    expect(bytesToBase64url([171])).toBe("qw")
    expect(base64urlToBytes("qw")).toEqual([171])
  })

  test("all-zero triple", () => {
    expect(bytesToBase64url([0, 0, 0])).toBe("AAAA")
    expect(base64urlToBytes("AAAA")).toEqual([0, 0, 0])
  })

  test("all-ones triple maps to the URL-safe high chars", () => {
    expect(bytesToBase64url([255, 255, 255])).toBe("____")
    expect(base64urlToBytes("____")).toEqual([255, 255, 255])
  })
})

describe("base64url — round trip", () => {
  const cases: number[][] = [
    [],
    [0],
    [1, 2, 3, 4, 5],
    [255, 0, 128, 64, 32, 16, 8, 4, 2, 1],
    [17, 240, 3, 199, 42, 200, 255, 1, 88],
  ]
  for (const bytes of cases) {
    test(`round trips ${JSON.stringify(bytes)}`, () => {
      expect(base64urlToBytes(bytesToBase64url(bytes))).toEqual(bytes)
    })
  }
})

describe("bit-writer — known-answer vectors", () => {
  test("MSB-first packing across field boundaries", () => {
    const w = makeBitWriter()
    writeBits(w, 0b101, 3)
    writeBits(w, 0b01, 2)
    writeBits(w, 0b110, 3)
    expect(bitsWritten(w)).toBe(8)
    expect(bitWriterToBytes(w)).toEqual([0b10101110])
  })

  test("final partial byte is zero-padded on the right", () => {
    const w = makeBitWriter()
    writeBits(w, 0b101, 3)
    expect(bitWriterToBytes(w)).toEqual([0b10100000])
  })

  test("full byte value survives", () => {
    const w = makeBitWriter()
    writeBits(w, 0xab, 8)
    expect(bitWriterToBytes(w)).toEqual([0xab])
  })
})

describe("bit-writer ⇄ bit-reader round trip", () => {
  test("reads back the exact field values written, MSB-first", () => {
    const fields: Array<[value: number, bits: number]> = [
      [5, 3],
      [1, 2],
      [6, 3],
      [200, 8],
      [1023, 10],
      [0, 4],
    ]
    const w = makeBitWriter()
    for (const [value, bits] of fields) writeBits(w, value, bits)
    const bytes = bitWriterToBytes(w)

    const r = makeBitReader(bytes)
    for (const [value, bits] of fields) {
      expect(readBits(r, bits)).toBe(value)
    }
  })
})
