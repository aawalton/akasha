import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { stolenFilter } from "./stolen-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const stolen: ItemFacts = { ...baseFacts, isStolen: true }
const notStolen: ItemFacts = { ...baseFacts, isStolen: false }
const unknown: ItemFacts = { ...baseFacts }

describe("stolenFilter", () => {
  it("include matches a stolen item and rejects a not-stolen item", () => {
    expect(stolenFilter.matches(stolen, "include")).toBe(true)
    expect(stolenFilter.matches(notStolen, "include")).toBe(false)
  })

  it("exclude matches a not-stolen item and rejects a stolen item", () => {
    expect(stolenFilter.matches(notStolen, "exclude")).toBe(true)
    expect(stolenFilter.matches(stolen, "exclude")).toBe(false)
  })

  it("fails closed when the flag is undefined (neither include nor exclude matches)", () => {
    expect(stolenFilter.matches(unknown, "include")).toBe(false)
    expect(stolenFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(stolenFilter.deserialize(stolenFilter.serialize("include"))).toBe("include")
    expect(stolenFilter.deserialize(stolenFilter.serialize("exclude"))).toBe("exclude")
    expect(stolenFilter.deserialize("nonsense")).toBeUndefined()
    expect(stolenFilter.deserialize(42)).toBeUndefined()
  })
})
