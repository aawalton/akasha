
import { describe, expect, it } from "bun:test"
import { canonical, digestOf, hold } from "../lib/digest-harness.ts"
import { answer, STANDING, VECTORS } from "./oauth-schemas-vectors.ts"

describe("oauth-schemas — the port answers what the code repository answers", () => {
  for (const vector of VECTORS) {
    it(`agrees on ${vector.id}`, () => {
      const standing = STANDING[vector.id]
      if (standing === undefined) throw new Error(`no standing answer for ${vector.id}`)
      const verdict = hold(vector.id, standing, answer(vector))
      expect(verdict.matches).toBe(true)
    })
  }

  it("holds every vector the standing table names, and no vector twice", () => {
    const ids = VECTORS.map((vector) => vector.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.slice().sort()).toEqual(Object.keys(STANDING).sort())
  })
})

describe("the encoding these comparisons rest on", () => {
  it("tells an absent field from one held as null, and drops undefined", () => {
    expect(digestOf({ email: undefined })).toBe(digestOf({}))
    expect(digestOf({ email: null })).not.toBe(digestOf({}))
    expect(canonical({ email: null })).toContain("null")
  })

  it("distinguishes a refusal from a success that carried no projected field", () => {
    expect(digestOf({ success: false })).not.toBe(digestOf({ success: true }))
  })
})
