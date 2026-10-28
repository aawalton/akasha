import { expect, test } from "bun:test"
import {
  allotHouses,
  chainHouses,
  firstHouseWithRoom,
  furnishingLimitTypeOf,
  houseDestinationOf,
  houseLocationKeyFor,
  houseRoomFor,
  houseTarget,
  roomsIn,
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

const GALLERY_CHAIN = [
  { destination: "house:1072" as const },
  { destination: "house:8353" as const },
  { destination: "furniture-vault" as const },
]

const LOCATIONS = {
  "House:Snugpod": SNUGPOD,
  "House:Alpine": {
    displayName: "Antiquarian's Alpine Gallery",
    house: { collectibleId: 8353, houseId: 60, furnishingLimits: { 0: { limit: 4, placed: 0 } } },
  },
}

function bound(name: string, units: number, limitType = 0) {
  return { name, chain: GALLERY_CHAIN, limitType, units }
}

test("houses are allotted no more than the room their last scan recorded, smallest stacks first", () => {
  const candidates = [bound("six", 6), bound("one", 1), bound("three", 3), bound("four", 4)]
  const allotted = allotHouses(candidates, roomsIn(LOCATIONS))
  expect(allotted.map((one) => [one.bound.name, one.collectibleId])).toEqual([
    ["one", 1072],
    ["three", 1072],
    ["four", 1072],
  ])
})

test("a stack too big for what is left of every house is allotted none", () => {
  const candidates = [bound("one", 1), bound("three", 3), bound("four", 4), bound("five", 5)]
  const allotted = allotHouses(candidates, roomsIn(LOCATIONS))
  expect(allotted.map((one) => one.bound.name)).toEqual(["one", "three", "four"])
})

test("a house never scanned is allotted nothing", () => {
  const unscanned = [
    { name: "one", chain: [{ destination: "house:9999" as const }], limitType: 0, units: 1 },
  ]
  expect(allotHouses(unscanned, roomsIn(LOCATIONS))).toEqual([])
})

test("a stack allotted a house resolves to a house, so nothing sends it back to the vault", () => {
  const roomOf = roomsIn(LOCATIONS)
  for (const one of allotHouses([bound("one", 1), bound("three", 3), bound("four", 4)], roomOf)) {
    expect(firstHouseWithRoom(one.bound, roomOf)).toBeDefined()
  }
  expect(firstHouseWithRoom(bound("twenty", 20), roomOf)).toBeUndefined()
})

test("a furnishing read with no limit type counts as a traditional item", () => {
  expect(furnishingLimitTypeOf({})).toBe(0)
  expect(furnishingLimitTypeOf({ furnishingLimitType: 1 })).toBe(1)
})
