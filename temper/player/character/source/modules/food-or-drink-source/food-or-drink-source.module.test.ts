import { expect, test } from "bun:test"
import { foodOrDrinkOf } from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"

function rowOf(abilityId: unknown): Readonly<Record<string, unknown>> {
  return {
    slug: "aetherial-tea",
    title: "Aetherial Tea",
    foodOrDrinkKind: "drink",
    itemId: 57646,
    abilityId,
    seconds: 3960,
    hashPlace: 0,
  }
}

test("a food or drink the catalog reads with no ability, stated or as null, has none", () => {
  expect(foodOrDrinkOf([rowOf(undefined)]).data["aetherial-tea"]?.abilityId).toBeNull()
  expect(foodOrDrinkOf([rowOf(null)]).data["aetherial-tea"]?.abilityId).toBeNull()
})

test("a food or drink keeps the ability it states", () => {
  expect(foodOrDrinkOf([rowOf(61322)]).data["aetherial-tea"]?.abilityId).toBe(61322)
})

test("an ability that is no number is refused", () => {
  expect(() => foodOrDrinkOf([rowOf("61322")])).toThrow("states a game ability that is no number")
})
