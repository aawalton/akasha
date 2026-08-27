import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("edge cases", () => {
  it("unknown filterType falls through to Miscellaneous > Other", () => {
    const path = classifyItem(item({ filterType: 999, itemType: 999 }))
    expect(path).toEqual(["Miscellaneous", "Other"])
  })

  it("item with only filterType and itemType still classifies", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 4 }))
    expect(path).toEqual(["Consumables", "Food"])
  })

  it("survey report name matching routes to correct craft line", () => {
    const enchanter = classifyItem(
      item({
        filterType: 5,
        itemType: 5,
        specializedItemType: 101,
        itemName: "Enchanter's Survey: Bangkorai",
      })
    )
    expect(enchanter).toEqual(["Tasks", "Survey Reports", "Enchanting"])

    const blacksmith = classifyItem(
      item({
        filterType: 5,
        itemType: 5,
        specializedItemType: 101,
        itemName: "Blacksmith Survey: Craglorn",
      })
    )
    expect(blacksmith).toEqual(["Tasks", "Survey Reports", "Blacksmithing"])
  })

  it("furnishing recipe classifies under Knowledge > Recipes > Furnishing Recipes", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 29, specializedItemType: 172 }))
    expect(path).toEqual(["Knowledge", "Recipes", "Furnishing Recipes", "Diagrams (Blacksmithing)"])
  })

  it("drink recipe classifies to Drink Recipes", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 29, specializedItemType: 171 }))
    expect(path).toEqual(["Knowledge", "Recipes", "Drink Recipes"])
  })

  it("grimoire goes to Knowledge > Scribing > Grimoires", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 72, specializedItemType: 3200 }))
    expect(path).toEqual(["Knowledge", "Scribing", "Grimoires"])
  })

  it("script focus goes to Knowledge > Scribing > Scripts > Focus", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 73, specializedItemType: 3250 }))
    expect(path).toEqual(["Knowledge", "Scribing", "Scripts", "Focus"])
  })

  it("junk items route to Miscellaneous > Junk", () => {
    const path = classifyItem(item({ filterType: 9, itemType: 0 }))
    expect(path).toEqual(["Miscellaneous", "Junk"])
  })

  it("collectibles route to Miscellaneous > Collectibles", () => {
    const path = classifyItem(item({ filterType: 12, itemType: 34 }))
    expect(path).toEqual(["Miscellaneous", "Collectibles"])
  })
})
