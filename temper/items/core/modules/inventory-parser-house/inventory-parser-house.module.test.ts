import { expect, test } from "bun:test"
import {
  parseHouse,
  parsePlacedFurnishing,
} from "akasha/temper/items/core/modules/inventory-parser-house/inventory-parser-house.module.code.ts"

test("a house keeps its ids and each limit type's limit and placed count", () => {
  const house = parseHouse({
    collectibleId: 1072,
    houseId: 31,
    furnishingLimits: { 0: { limit: 700, placed: 12 }, 1: { limit: 100, placed: 0 } },
  })
  expect(house).toEqual({
    collectibleId: 1072,
    houseId: 31,
    furnishingLimits: { 0: { limit: 700, placed: 12 }, 1: { limit: 100, placed: 0 } },
  })
})

test("a house with no house id is no house", () => {
  expect(parseHouse({ collectibleId: 1072 })).toBeUndefined()
})

test("a limit missing its placed count is left off", () => {
  const house = parseHouse({ collectibleId: 1, houseId: 2, furnishingLimits: { 0: { limit: 9 } } })
  expect(house?.furnishingLimits).toEqual({})
})

test("a placed furnishing keeps the limit type it counts against", () => {
  const placed = parsePlacedFurnishing({
    itemName: "imperial lantern, wall",
    quality: 2,
    itemLink: "",
    collectibleLink: "",
    furnishingLimitType: 0,
  })
  expect(placed?.furnishingLimitType).toBe(0)
  expect(placed?.itemName).toBe("Imperial Lantern, Wall")
})
