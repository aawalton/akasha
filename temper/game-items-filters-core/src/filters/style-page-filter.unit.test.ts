import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { stylePageFilter } from "./style-page-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const stylePage: ItemFacts = { ...baseFacts, specializedItemType: 82 }
const nonStylePage: ItemFacts = { ...baseFacts, specializedItemType: 101 }
const undefinedType: ItemFacts = { ...baseFacts }

describe("stylePageFilter", () => {
  it("include matches a style page and rejects a non-style-page", () => {
    expect(stylePageFilter.matches(stylePage, "include")).toBe(true)
    expect(stylePageFilter.matches(nonStylePage, "include")).toBe(false)
  })

  it("exclude matches a non-style-page and rejects a style page", () => {
    expect(stylePageFilter.matches(nonStylePage, "exclude")).toBe(true)
    expect(stylePageFilter.matches(stylePage, "exclude")).toBe(false)
  })

  it("fails closed when the specialized type is undefined (neither toggle matches)", () => {
    expect(stylePageFilter.matches(undefinedType, "include")).toBe(false)
    expect(stylePageFilter.matches(undefinedType, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(stylePageFilter.deserialize(stylePageFilter.serialize("include"))).toBe("include")
    expect(stylePageFilter.deserialize(stylePageFilter.serialize("exclude"))).toBe("exclude")
    expect(stylePageFilter.deserialize("nonsense")).toBeUndefined()
    expect(stylePageFilter.deserialize(42)).toBeUndefined()
  })
})
