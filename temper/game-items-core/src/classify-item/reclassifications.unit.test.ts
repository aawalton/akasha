import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("reclassifications", () => {
  it("recipes go to Knowledge, not Consumables", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 29, specializedItemType: 170 }))
    expect(path[0]).toBe("Knowledge")
    expect(path[1]).toBe("Recipes")
  })

  it("style motifs go to Knowledge", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 8, specializedItemType: 60 }))
    expect(path).toEqual(["Knowledge", "Style Motifs", "Motif Books"])
  })

  it("master writs go to Tasks", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 60 }))
    expect(path).toEqual(["Tasks", "Master Writs"])
  })

  it("soul gems go to Consumables", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 19 }))
    expect(path).toEqual(["Consumables", "Soul Gems"])
  })

  it("lockpicks go to Consumables", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 22 }))
    expect(path).toEqual(["Consumables", "Lockpicks"])
  })

  it("skill scrolls go to Consumables > Skill Scrolls, not Miscellaneous > Other", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 76, specializedItemType: 3350 }))
    expect(path).toEqual(["Consumables", "Skill Scrolls"])
  })

  it("itemType 76 routes to Skill Scrolls on itemType alone (filterType/specialized independent)", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 76 }))
    expect(path).toEqual(["Consumables", "Skill Scrolls"])
  })

  it("equipment repair kits go to Consumables > Repair Kits, not Miscellaneous > Tools", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 9, specializedItemType: 500 }))
    expect(path).toEqual(["Consumables", "Repair Kits", "Equipment Repair Kits"])
  })

  it("furnishing materials go to their craft line", () => {
    const path = classifyItem(item({ filterType: 13, itemType: 62, specializedItemType: 1560 }))
    expect(path).toEqual(["Crafting", "Blacksmithing", "Furnishing Materials"])
  })

  it("scribing ink goes to Crafting", () => {
    const path = classifyItem(item({ filterType: 4, itemType: 74 }))
    expect(path).toEqual(["Crafting", "Scribing Ink"])
  })

  it("quest items go to Tasks", () => {
    const path = classifyItem(item({ filterType: 7, itemType: 0 }))
    expect(path).toEqual(["Tasks", "Quest Items"])
  })

  it("collectible fragments go to Knowledge", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 5, specializedItemType: 109 }))
    expect(path).toEqual(["Knowledge", "Collectibles", "Collectible Fragments"])
  })

  it("style pages go to Knowledge", () => {
    const path = classifyItem(item({ filterType: 12, itemType: 34, specializedItemType: 82 }))
    expect(path).toEqual(["Knowledge", "Style Pages"])
  })
})
