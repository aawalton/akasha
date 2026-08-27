import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { transmutedFilter } from "./transmuted-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const transmuted: ItemFacts = { ...baseFacts, isTransmuted: true }
const notTransmuted: ItemFacts = { ...baseFacts, isTransmuted: false }
const unknown: ItemFacts = { ...baseFacts }

describe("transmutedFilter", () => {
  it("include matches a transmuted item and rejects a not-transmuted item", () => {
    expect(transmutedFilter.matches(transmuted, "include")).toBe(true)
    expect(transmutedFilter.matches(notTransmuted, "include")).toBe(false)
  })

  it("exclude matches a not-transmuted item and rejects a transmuted item", () => {
    expect(transmutedFilter.matches(notTransmuted, "exclude")).toBe(true)
    expect(transmutedFilter.matches(transmuted, "exclude")).toBe(false)
  })

  it("fails closed when the flag is undefined (neither include nor exclude matches)", () => {
    expect(transmutedFilter.matches(unknown, "include")).toBe(false)
    expect(transmutedFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(transmutedFilter.deserialize(transmutedFilter.serialize("include"))).toBe("include")
    expect(transmutedFilter.deserialize(transmutedFilter.serialize("exclude"))).toBe("exclude")
    expect(transmutedFilter.deserialize("nonsense")).toBeUndefined()
    expect(transmutedFilter.deserialize(42)).toBeUndefined()
  })
})
