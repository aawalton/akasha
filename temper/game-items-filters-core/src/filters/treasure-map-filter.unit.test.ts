import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { treasureMapFilter } from "./treasure-map-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const treasureMap: ItemFacts = { ...baseFacts, specializedItemType: 100 }
const nonTreasureMap: ItemFacts = { ...baseFacts, specializedItemType: 101 }
const undefinedType: ItemFacts = { ...baseFacts }

describe("treasureMapFilter", () => {
  it("include matches a treasure map and rejects a non-treasure-map", () => {
    expect(treasureMapFilter.matches(treasureMap, "include")).toBe(true)
    expect(treasureMapFilter.matches(nonTreasureMap, "include")).toBe(false)
  })

  it("exclude matches a non-treasure-map and rejects a treasure map", () => {
    expect(treasureMapFilter.matches(nonTreasureMap, "exclude")).toBe(true)
    expect(treasureMapFilter.matches(treasureMap, "exclude")).toBe(false)
  })

  it("fails closed when the specialized type is undefined (neither toggle matches)", () => {
    expect(treasureMapFilter.matches(undefinedType, "include")).toBe(false)
    expect(treasureMapFilter.matches(undefinedType, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(treasureMapFilter.deserialize(treasureMapFilter.serialize("include"))).toBe("include")
    expect(treasureMapFilter.deserialize(treasureMapFilter.serialize("exclude"))).toBe("exclude")
    expect(treasureMapFilter.deserialize("nonsense")).toBeUndefined()
    expect(treasureMapFilter.deserialize(42)).toBeUndefined()
  })
})
