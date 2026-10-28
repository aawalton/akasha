import { expect, test } from "bun:test"
import {
  chainHouses,
  furnishingLimitTypeOf,
  houseDestinationOf,
  houseLocationKeyFor,
  houseRoomFor,
  houseTarget,
} from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"

const SNUGPOD = {
  displayName: "Snugpod",
  house: {
    collectibleId: 1072,
    houseId: 31,
    furnishingLimits: { 0: { limit: 200, placed: 190 }, 1: { limit: 20, placed: 25 } },
  },
}

test("a house destination names its house by collectible id", () => {
  expect(houseTarget("house:1072")).toBe(1072)
  expect(houseDestinationOf(1072)).toBe("house:1072")
})

test("a destination that is no house names no house", () => {
  expect(houseTarget("house-storage:Wealth")).toBeUndefined()
  expect(houseTarget("house:Snugpod")).toBeUndefined()
  expect(houseTarget(undefined)).toBeUndefined()
})

test("a chain's houses are read in the chain's order", () => {
  const chain = [
    { destination: "house:12732" as const },
    { destination: "house:8353" as const },
    { destination: "furniture-vault" as const },
  ]
  expect(chainHouses(chain)).toEqual([12732, 8353])
})

test("a house's location is the one whose house is that collectible", () => {
  const locations = { "House:Snugpod": SNUGPOD, Bank: { displayName: "Bank" } }
  expect(houseLocationKeyFor(1072, locations)).toBe("House:Snugpod")
  expect(houseLocationKeyFor(1073, locations)).toBeUndefined()
})

test("a house's room is its limit less the count placed, never below none", () => {
  expect(houseRoomFor(SNUGPOD, 0)).toBe(10)
  expect(houseRoomFor(SNUGPOD, 1)).toBe(0)
})

test("a house never scanned for its limits has no known room", () => {
  expect(houseRoomFor({ displayName: "Snugpod" }, 0)).toBeUndefined()
  expect(houseRoomFor(undefined, 0)).toBeUndefined()
})

test("a furnishing read with no limit type counts as a traditional item", () => {
  expect(furnishingLimitTypeOf({})).toBe(0)
  expect(furnishingLimitTypeOf({ furnishingLimitType: 1 })).toBe(1)
})
