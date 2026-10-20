import { expect, test } from "bun:test"
import {
  ITEM_LEVEL_BITS,
  itemLevelOfPlace,
  itemLevelPlaceOf,
  itemLevelPlaceOfRequired,
} from "akasha/temper/player/character/build/build-codec/modules/item-level-places/item-level-places.module.code.ts"

test("every character level and champion level is read back from its place as itself", () => {
  const levels = [1, 16, 26, 36, 46, 50, "CP10", "CP40", "CP70", "CP90", "CP150", "CP160"] as const
  for (const level of levels) expect(itemLevelOfPlace(itemLevelPlaceOf(level))).toBe(level)
})

test("a piece with no level said takes place zero and is read back with no level", () => {
  expect(itemLevelPlaceOf(undefined)).toBe(0)
  expect(itemLevelOfPlace(0)).toBeUndefined()
})

test("the highest place fits the bits a piece's level is written in", () => {
  expect(itemLevelPlaceOf("CP160")).toBeLessThan(2 ** ITEM_LEVEL_BITS)
})

test("a level the game states as required level and champion points takes the place it names", () => {
  expect(itemLevelPlaceOfRequired(1, 0)).toBe(itemLevelPlaceOf(1))
  expect(itemLevelPlaceOfRequired(26, 0)).toBe(itemLevelPlaceOf(26))
  expect(itemLevelPlaceOfRequired(50, 0)).toBe(itemLevelPlaceOf(50))
  expect(itemLevelPlaceOfRequired(50, 10)).toBe(itemLevelPlaceOf("CP10"))
  expect(itemLevelPlaceOfRequired(50, 150)).toBe(itemLevelPlaceOf("CP150"))
  expect(itemLevelPlaceOfRequired(50, 160)).toBe(itemLevelPlaceOf("CP160"))
})

test("a piece the game states no level for takes place zero", () => {
  expect(itemLevelPlaceOfRequired(0, 0)).toBe(0)
})
