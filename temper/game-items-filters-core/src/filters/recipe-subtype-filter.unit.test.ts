import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { recipeSubtypeFilter } from "./recipe-subtype-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const foodRecipe: ItemFacts = { ...baseFacts, specializedItemType: 170 }
const drinkRecipe: ItemFacts = { ...baseFacts, specializedItemType: 171 }
const furnishingRecipe: ItemFacts = { ...baseFacts, specializedItemType: 172 }
const jewelryFurnishingRecipe: ItemFacts = { ...baseFacts, specializedItemType: 178 }
const nonRecipe: ItemFacts = { ...baseFacts, specializedItemType: 101 }
const undefinedType: ItemFacts = { ...baseFacts }

describe("recipeSubtypeFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(recipeSubtypeFilter.matches(foodRecipe, [])).toBe(true)
    expect(recipeSubtypeFilter.matches(nonRecipe, [])).toBe(true)
    expect(recipeSubtypeFilter.matches(undefinedType, [])).toBe(true)
  })

  it("matches an item whose specialized type is selected", () => {
    expect(recipeSubtypeFilter.matches(foodRecipe, ["170"])).toBe(true)
    expect(recipeSubtypeFilter.matches(drinkRecipe, ["170", "171"])).toBe(true)
    expect(recipeSubtypeFilter.matches(furnishingRecipe, ["172"])).toBe(true)
    expect(recipeSubtypeFilter.matches(jewelryFurnishingRecipe, ["178"])).toBe(true)
  })

  it("rejects an item whose specialized type is not selected", () => {
    expect(recipeSubtypeFilter.matches(drinkRecipe, ["170"])).toBe(false)
    expect(recipeSubtypeFilter.matches(nonRecipe, ["170", "171", "172"])).toBe(false)
  })

  it("fails closed when the specialized type is undefined", () => {
    expect(recipeSubtypeFilter.matches(undefinedType, ["170"])).toBe(false)
  })

  it("offers all ten verified recipe-subtype options", () => {
    expect(recipeSubtypeFilter.editor.kind).toBe("multiselect")
    if (recipeSubtypeFilter.editor.kind !== "multiselect") throw new Error("expected multiselect")
    const values = recipeSubtypeFilter.editor.options.map((o) => o.value)
    expect(values).toEqual(["170", "171", "172", "173", "174", "175", "176", "177", "178"])
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(recipeSubtypeFilter.deserialize(recipeSubtypeFilter.serialize(["170", "172"]))).toEqual([
      "170",
      "172",
    ])
    expect(recipeSubtypeFilter.deserialize("nonsense")).toBeUndefined()
    expect(recipeSubtypeFilter.deserialize(42)).toBeUndefined()
    expect(recipeSubtypeFilter.deserialize([1, 2])).toBeUndefined()
  })
})
