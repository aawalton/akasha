import { describe, expect, it } from "bun:test"
import { locationConditionFromKeyAndBag } from "./location-condition"

describe("locationConditionFromKeyAndBag", () => {
  it("splits a character location into worn vs backpack by bagId", () => {
    expect(locationConditionFromKeyAndBag("123456789", 0)).toBe("worn")
    expect(locationConditionFromKeyAndBag("123456789", 1)).toBe("backpack")
  })

  it("maps non-character location keys through classifyLocation (bagId ignored)", () => {
    expect(locationConditionFromKeyAndBag("Bank", 5)).toBe("bank")
    expect(locationConditionFromKeyAndBag("CraftBag", 16)).toBe("craftbag")
    expect(locationConditionFromKeyAndBag("FurnitureVault", 31)).toBe("housing-storage")
    expect(locationConditionFromKeyAndBag("HouseBank:1:2", 34)).toBe("housing-storage")
    expect(locationConditionFromKeyAndBag("House:1", 0)).toBe("house")
    expect(locationConditionFromKeyAndBag("Companion:Bastian", 32)).toBe("companion")
    expect(locationConditionFromKeyAndBag("My Trading Guild", 17)).toBe("guild")
  })
})
