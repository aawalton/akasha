import { expect, test } from "bun:test"
import { stockPriorityRank } from "akasha/temper/items/rules/core/modules/stock-item-priority/stock-item-priority.module.code.ts"

const MAGICKA = [112427, 176040, 27037] as const

test("the elixir listed first ranks first", () => {
  expect(stockPriorityRank(MAGICKA, 112427)).toBe(0)
})

test("the normal potion listed last ranks last among those listed", () => {
  expect(stockPriorityRank(MAGICKA, 27037)).toBe(2)
})

test("an item the list does not name ranks after every listed item", () => {
  expect(stockPriorityRank(MAGICKA, 54340)).toBe(3)
})

test("a rule listing no ids ranks every item alike", () => {
  expect(stockPriorityRank(undefined, 112427)).toBe(stockPriorityRank(undefined, 27037))
})
