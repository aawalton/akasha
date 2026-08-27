import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("L0 routing", () => {
  it("routes companion items to Companion", () => {
    const path = classifyItem(
      item({ filterType: 27, itemType: 1, traitType: 36, equipType: 5, weaponType: 3 })
    )
    expect(path[0]).toBe("Companion")
  })

  it("routes recipes to Knowledge", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 29, specializedItemType: 170 }))
    expect(path[0]).toBe("Knowledge")
  })

  it("routes survey reports to Tasks", () => {
    const path = classifyItem(
      item({ filterType: 5, itemType: 5, specializedItemType: 101, itemName: "Blacksmith Survey" })
    )
    expect(path[0]).toBe("Tasks")
  })

  it("routes food to Consumables", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 4 }))
    expect(path[0]).toBe("Consumables")
  })

  it("routes weapons to Equipment", () => {
    const path = classifyItem(item({ filterType: 1, itemType: 1, equipType: 5, weaponType: 3 }))
    expect(path[0]).toBe("Equipment")
  })

  it("routes blacksmithing materials to Crafting", () => {
    const path = classifyItem(item({ filterType: 13, itemType: 35 }))
    expect(path[0]).toBe("Crafting")
  })

  it("routes furnishings to Furnishings", () => {
    const path = classifyItem(
      item({ filterType: 21, itemType: 61, furnitureCategoryId: 1, furnitureSubcategoryId: 45 })
    )
    expect(path[0]).toBe("Furnishings")
  })

  it("routes siege equipment to Miscellaneous", () => {
    const path = classifyItem(item({ filterType: 5, itemType: 6, specializedItemType: 400 }))
    expect(path[0]).toBe("Miscellaneous")
  })
})
