import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { lockedFilter } from "./locked-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const locked: ItemFacts = { ...baseFacts, isLocked: true }
const notLocked: ItemFacts = { ...baseFacts, isLocked: false }
const unknown: ItemFacts = { ...baseFacts }

describe("lockedFilter", () => {
  it("include matches a locked item and rejects a not-locked item", () => {
    expect(lockedFilter.matches(locked, "include")).toBe(true)
    expect(lockedFilter.matches(notLocked, "include")).toBe(false)
  })

  it("exclude matches a not-locked item and rejects a locked item", () => {
    expect(lockedFilter.matches(notLocked, "exclude")).toBe(true)
    expect(lockedFilter.matches(locked, "exclude")).toBe(false)
  })

  it("fails closed when the flag is undefined (neither include nor exclude matches)", () => {
    expect(lockedFilter.matches(unknown, "include")).toBe(false)
    expect(lockedFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(lockedFilter.deserialize(lockedFilter.serialize("include"))).toBe("include")
    expect(lockedFilter.deserialize(lockedFilter.serialize("exclude"))).toBe("exclude")
    expect(lockedFilter.deserialize("nonsense")).toBeUndefined()
    expect(lockedFilter.deserialize(42)).toBeUndefined()
  })
})
