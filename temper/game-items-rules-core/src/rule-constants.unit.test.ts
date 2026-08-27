import { describe, expect, it } from "bun:test"
import { RULE_CONSTANT_KEYS, RULE_CONSTANTS, resolveThreshold } from "./rule-constants"

describe("RULE_CONSTANTS", () => {
  it("defines MIN_LISTING_VALUE as 5000", () => {
    expect(RULE_CONSTANTS.MIN_LISTING_VALUE).toBe(5000)
  })
})

describe("resolveThreshold", () => {
  it("returns a literal number unchanged", () => {
    expect(resolveThreshold(5000)).toBe(5000)
  })

  it("returns 0 unchanged (no falsy short-circuit)", () => {
    expect(resolveThreshold(0)).toBe(0)
  })

  it("looks up a constant key to its number", () => {
    expect(resolveThreshold("MIN_LISTING_VALUE")).toBe(5000)
  })
})

describe("RULE_CONSTANT_KEYS", () => {
  it("contains MIN_LISTING_VALUE", () => {
    expect(RULE_CONSTANT_KEYS).toContain("MIN_LISTING_VALUE")
  })
})
