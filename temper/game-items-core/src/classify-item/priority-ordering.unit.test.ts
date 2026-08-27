import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("priority ordering", () => {
  it("recipe (filterType 3, itemType 29) goes to Knowledge not Consumables", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 29, specializedItemType: 170 }))
    expect(path[0]).toBe("Knowledge")
  })

  it("master writ (filterType 3, itemType 60) goes to Tasks not Consumables", () => {
    const path = classifyItem(item({ filterType: 3, itemType: 60 }))
    expect(path[0]).toBe("Tasks")
  })

  it("survey report goes to Tasks before Miscellaneous", () => {
    const path = classifyItem(
      item({ filterType: 5, itemType: 5, specializedItemType: 101, itemName: "Blacksmith Survey" })
    )
    expect(path[0]).toBe("Tasks")
  })

  it("companion filterType 27 always goes to Companion first", () => {
    const path = classifyItem(
      item({ filterType: 27, itemType: 1, traitType: 36, equipType: 5, weaponType: 3 })
    )
    expect(path[0]).toBe("Companion")
  })
})
