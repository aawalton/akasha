import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("broad filterType resilience", () => {
  it("essence rune with broad filterType routes to Enchanting", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 53 }))
    expect(path).toEqual(["Crafting", "Enchanting", "Essence Runestones"])
  })

  it("potency rune with broad filterType routes to Enchanting", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 51 }))
    expect(path).toEqual(["Crafting", "Enchanting", "Potency Runestones"])
  })

  it("aspect rune with broad filterType routes to Enchanting", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 52 }))
    expect(path).toEqual(["Crafting", "Enchanting", "Aspect Runestones"])
  })

  it("blacksmithing raw with broad filterType routes to Blacksmithing", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 35 }))
    expect(path).toEqual(["Crafting", "Blacksmithing", "Raw Materials"])
  })

  it("reagent herb with broad filterType routes to Alchemy", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 31, specializedItemType: 150 }))
    expect(path).toEqual(["Crafting", "Alchemy", "Reagents", "Herbs"])
  })

  it("provisioning ingredient with broad filterType routes to Provisioning", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 10, specializedItemType: 42 }))
    expect(path).toEqual(["Crafting", "Provisioning", "Ingredients", "Food Ingredients"])
  })

  it("furnishing material with broad filterType routes to General Crafting", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 62 }))
    expect(path).toEqual(["Crafting", "General Crafting"])
  })

  it("furnishing material with specific filterType routes to correct line", () => {
    const path = classifyItem(item({ filterType: 17, itemType: 62 }))
    expect(path).toEqual(["Crafting", "Enchanting", "Furnishing Materials"])
  })

  it("unknown crafting item with broad filterType routes to General Crafting", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 0 }))
    expect(path).toEqual(["Crafting", "General Crafting"])
  })
})
