import { expect, test } from "bun:test"
import { RECONSTRUCTION_COST_FILTER } from "akasha/temper/items/filters/core/modules/search-reconstruction-cost-filter/search-reconstruction-cost-filter.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"

function factsCosting(reconstructionCost: number | undefined): ItemFacts {
  return { itemId: 1, itemName: "Piece", itemLink: "|H1:item:1|h|h", reconstructionCost }
}

test("a set item costing at or below the most stated is matched", () => {
  expect(RECONSTRUCTION_COST_FILTER.matches(factsCosting(25), { value: 25 })).toBe(true)
  expect(RECONSTRUCTION_COST_FILTER.matches(factsCosting(10), { value: 25 })).toBe(true)
})

test("a set item costing more than the most stated is not matched", () => {
  expect(RECONSTRUCTION_COST_FILTER.matches(factsCosting(50), { value: 25 })).toBe(false)
})

test("an item whose cost is unknown is not matched", () => {
  expect(RECONSTRUCTION_COST_FILTER.matches(factsCosting(undefined), { value: 1000 })).toBe(false)
})

test("a saved value reads back as the most crystals with the at-most operator", () => {
  const saved = RECONSTRUCTION_COST_FILTER.serialize({ value: 25 })
  expect(saved).toEqual({ value: 25, op: "<=" })
  expect(RECONSTRUCTION_COST_FILTER.deserialize(saved)).toEqual({ value: 25, op: "<=" })
})
