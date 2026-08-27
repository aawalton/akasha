
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { instantToMillis } from "../lib/pages-instant.ts"

const VECTORS: ReadonlyArray<readonly [unknown, number | null]> = [
  [0, 0],
  [1, 1],
  [-1, -1],
  [1_700_000_000_000, 1_700_000_000_000],
  [1.5, 1.5],
  [-1_000, -1_000],
  [Number.NaN, null],
  [Number.POSITIVE_INFINITY, null],
  [Number.NEGATIVE_INFINITY, null],
  ["", null],
  ["2026-08-12T22:00:00.000Z", 1_786_572_000_000],
  ["2026-08-12T22:00:00Z", 1_786_572_000_000],
  ["2026-08-12T22:00:00+02:00", 1_786_564_800_000],
  ["2026-08-12", 1_786_492_800_000],
  ["2026-07-28T15:08:03.8341+00:00", 1_785_251_283_834],
  ["2026-08-12 22:00:00+00", 1_786_572_000_000],
  ["not a date", null],
  [" 2026-08-12T22:00:00.000Z ", null],
  [null, null],
  [undefined, null],
  [true, null],
  [false, null],
  [{}, null],
  [[], null],
  [{ a: 1 }, null],
]

describe("instantToMillis, held against the standing implementation", () => {
  it("answers what the code repository answered, over every vector", () => {
    const standing = VECTORS.map(([, answer]) => answer)
    const ported = VECTORS.map(([input]) => instantToMillis(input))
    const verdict = hold("instantToMillis", standing, ported)
    expect(verdict.ported).toBe(verdict.standing)
    expect(verdict.matches).toBe(true)
  })

  it("goes red when one standing answer is changed", () => {
    const standing = VECTORS.map(([, answer]) => answer)
    const tampered = [...standing]
    tampered[10] = 1_786_572_000_001
    const ported = VECTORS.map(([input]) => instantToMillis(input))
    expect(hold("instantToMillis", tampered, ported).matches).toBe(false)
  })
})
