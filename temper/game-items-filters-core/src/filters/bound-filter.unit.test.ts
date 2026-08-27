import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { boundFilter } from "./bound-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const bound: ItemFacts = { ...baseFacts, isBound: true }
const notBound: ItemFacts = { ...baseFacts, isBound: false }
const unknown: ItemFacts = { ...baseFacts }

describe("boundFilter", () => {
  it("include matches a bound item and rejects a not-bound item", () => {
    expect(boundFilter.matches(bound, "include")).toBe(true)
    expect(boundFilter.matches(notBound, "include")).toBe(false)
  })

  it("exclude matches a not-bound item and rejects a bound item", () => {
    expect(boundFilter.matches(notBound, "exclude")).toBe(true)
    expect(boundFilter.matches(bound, "exclude")).toBe(false)
  })

  it("fails closed when the flag is undefined (neither include nor exclude matches)", () => {
    expect(boundFilter.matches(unknown, "include")).toBe(false)
    expect(boundFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(boundFilter.deserialize(boundFilter.serialize("include"))).toBe("include")
    expect(boundFilter.deserialize(boundFilter.serialize("exclude"))).toBe("exclude")
    expect(boundFilter.deserialize("nonsense")).toBeUndefined()
    expect(boundFilter.deserialize(42)).toBeUndefined()
  })
})
