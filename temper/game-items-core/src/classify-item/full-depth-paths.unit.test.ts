import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("full-depth paths", () => {
  it("classifies a sword to Equipment > Weapons > One-Handed > Sword", () => {
    const path = classifyItem(item({ filterType: 1, itemType: 1, equipType: 5, weaponType: 3 }))
    expect(path).toEqual(["Equipment", "Weapons", "One-Handed", "Sword"])
  })

  it("classifies heavy helm to Equipment > Armor > Heavy Armor > Helm", () => {
    const path = classifyItem(item({ filterType: 2, itemType: 2, armorType: 3, equipType: 1 }))
    expect(path).toEqual(["Equipment", "Armor", "Heavy Armor", "Helm"])
  })

  it("classifies blacksmithing raw ore to Crafting > Blacksmithing > Raw Materials", () => {
    const path = classifyItem(item({ filterType: 13, itemType: 35, specializedItemType: 1500 }))
    expect(path).toEqual(["Crafting", "Blacksmithing", "Raw Materials"])
  })

  it("classifies alchemy herb reagent to Crafting > Alchemy > Reagents > Herbs", () => {
    const path = classifyItem(item({ filterType: 16, itemType: 31, specializedItemType: 150 }))
    expect(path).toEqual(["Crafting", "Alchemy", "Reagents", "Herbs"])
  })

  it("classifies furniture subcategory to Furnishings > Suite > Bedding", () => {
    const path = classifyItem(
      item({ filterType: 21, itemType: 61, furnitureCategoryId: 1, furnitureSubcategoryId: 45 })
    )
    expect(path).toEqual(["Furnishings", "Suite", "Bedding"])
  })

  it("classifies a shield to Equipment > Armor > Shield", () => {
    const path = classifyItem(item({ filterType: 2, itemType: 1, equipType: 7, weaponType: 14 }))
    expect(path).toEqual(["Equipment", "Armor", "Shield"])
  })

  it("classifies a ring to Equipment > Jewelry > Ring", () => {
    const path = classifyItem(item({ filterType: 25, itemType: 2, equipType: 12 }))
    expect(path).toEqual(["Equipment", "Jewelry", "Ring"])
  })

  it("classifies a siege trebuchet to Miscellaneous > Alliance War > Siege Equipment > Trebuchet", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 6, specializedItemType: 400 }))
    expect(path).toEqual(["Miscellaneous", "Alliance War", "Siege Equipment", "Trebuchet"])
  })
})
