import { describe, expect, it } from "bun:test"
import { classifyItem } from "../classify-item"
import { item } from "./item"

describe("companion gear", () => {
  it("companion sword via traitType 34-42 range", () => {
    const path = classifyItem(
      item({ filterType: 27, itemType: 1, traitType: 36, equipType: 5, weaponType: 3 })
    )
    expect(path).toEqual(["Companion", "Weapons", "One-Handed", "Sword"])
  })

  it("companion heavy armor helm", () => {
    const path = classifyItem(
      item({ filterType: 27, itemType: 2, traitType: 45, armorType: 3, equipType: 1 })
    )
    expect(path).toEqual(["Companion", "Armor", "Heavy Armor", "Helm"])
  })

  it("companion necklace via traitType 52-60 range and equipType 2", () => {
    const path = classifyItem(item({ filterType: 27, itemType: 2, traitType: 55, equipType: 2 }))
    expect(path).toEqual(["Companion", "Jewelry", "Necklace"])
  })

  it("companion destruction staff inferno", () => {
    const path = classifyItem(item({ filterType: 27, itemType: 1, traitType: 38, weaponType: 12 }))
    expect(path).toEqual(["Companion", "Weapons", "Destruction Staff", "Inferno Staff"])
  })

  it("companion ring via traitType 52-60 range and equipType 12", () => {
    const path = classifyItem(item({ filterType: 27, itemType: 2, traitType: 55, equipType: 12 }))
    expect(path).toEqual(["Companion", "Jewelry", "Ring"])
  })

  it("companion shield routes to Armor (uses armor traits, not weapon traits)", () => {
    const path = classifyItem(
      item({ filterType: 27, itemType: 1, traitType: 43, equipType: 7, weaponType: 14 })
    )
    expect(path).toEqual(["Companion", "Armor", "Shield"])
  })

  it("companion jewelry without equipType stops at Jewelry", () => {
    const path = classifyItem(item({ filterType: 27, itemType: 2, traitType: 55 }))
    expect(path).toEqual(["Companion", "Jewelry"])
  })

  it("companion item without traitType stops at Companion", () => {
    const path = classifyItem(item({ filterType: 27, itemType: 1 }))
    expect(path).toEqual(["Companion"])
  })
})
