import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("graceful degradation", () => {
  it("weapon without weaponType stops at Weapons", () => {
    const path = classifyItem(item({ filterType: 1, itemType: 1 }))
    expect(path).toEqual(["Equipment", "Weapons"])
  })

  it("armor without armorType stops at Armor", () => {
    const path = classifyItem(item({ filterType: 2, itemType: 2 }))
    expect(path).toEqual(["Equipment", "Armor"])
  })

  it("furnishing without subcategory stops at category", () => {
    const path = classifyItem(item({ filterType: 21, itemType: 61, furnitureCategoryId: 1 }))
    expect(path).toEqual(["Furnishings", "Suite"])
  })

  it("reagent without specializedItemType stops at Reagents", () => {
    const path = classifyItem(item({ filterType: 16, itemType: 31 }))
    expect(path).toEqual(["Crafting", "Alchemy", "Reagents"])
  })
})
