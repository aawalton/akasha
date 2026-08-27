import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { craftedFilter } from "./crafted-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const crafted: ItemFacts = { ...baseFacts, isCrafted: true }
const notCrafted: ItemFacts = { ...baseFacts, isCrafted: false }
const unknown: ItemFacts = { ...baseFacts }

describe("craftedFilter", () => {
  it("include matches a crafted item and rejects a not-crafted item", () => {
    expect(craftedFilter.matches(crafted, "include")).toBe(true)
    expect(craftedFilter.matches(notCrafted, "include")).toBe(false)
  })

  it("exclude matches a not-crafted item and rejects a crafted item", () => {
    expect(craftedFilter.matches(notCrafted, "exclude")).toBe(true)
    expect(craftedFilter.matches(crafted, "exclude")).toBe(false)
  })

  it("fails closed when the flag is undefined (neither include nor exclude matches)", () => {
    expect(craftedFilter.matches(unknown, "include")).toBe(false)
    expect(craftedFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(craftedFilter.deserialize(craftedFilter.serialize("include"))).toBe("include")
    expect(craftedFilter.deserialize(craftedFilter.serialize("exclude"))).toBe("exclude")
    expect(craftedFilter.deserialize("nonsense")).toBeUndefined()
    expect(craftedFilter.deserialize(42)).toBeUndefined()
  })
})
