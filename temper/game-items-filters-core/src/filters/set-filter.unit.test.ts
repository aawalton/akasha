import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { setFilter } from "./set-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const setItem: ItemFacts = { ...baseFacts, setId: 42 }
const nonSetItem: ItemFacts = { ...baseFacts, setId: 0 }
const unknown: ItemFacts = { ...baseFacts }

describe("setFilter", () => {
  it("include matches a set item and rejects a known non-set item", () => {
    expect(setFilter.matches(setItem, "include")).toBe(true)
    expect(setFilter.matches(nonSetItem, "include")).toBe(false)
  })

  it("exclude matches a known non-set item and rejects a set item", () => {
    expect(setFilter.matches(nonSetItem, "exclude")).toBe(true)
    expect(setFilter.matches(setItem, "exclude")).toBe(false)
  })

  it("fails closed when setId is undefined (neither pole matches)", () => {
    expect(setFilter.matches(unknown, "include")).toBe(false)
    expect(setFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(setFilter.deserialize(setFilter.serialize("include"))).toBe("include")
    expect(setFilter.deserialize(setFilter.serialize("exclude"))).toBe("exclude")
    expect(setFilter.deserialize("nonsense")).toBeUndefined()
    expect(setFilter.deserialize(42)).toBeUndefined()
  })
})
