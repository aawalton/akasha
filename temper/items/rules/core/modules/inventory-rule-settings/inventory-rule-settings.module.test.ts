import { expect, test } from "bun:test"
import {
  bulkUpdateCategoryRules,
  patchedRule,
  updateCategoryRule,
} from "akasha/temper/items/rules/core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const FLAT: CategoryRule = {
  id: "one",
  categoryId: "tools",
  action: "stock",
  active: true,
  destination: "bank",
}

const CHAIN: NonNullable<CategoryRule["destinationChain"]> = [
  { destination: "character:by-priority", targetQuantity: 200 },
  { destination: "bank" },
]

const CHAINED: CategoryRule = {
  id: "one",
  categoryId: "tools",
  action: "stock",
  active: true,
  destinationChain: CHAIN,
}

test("a change naming a chain drops the destination", () => {
  const next = patchedRule(FLAT, { destinationChain: CHAIN })
  expect(next.destinationChain).toEqual(CHAIN)
  expect("destination" in next).toBe(false)
})

test("a change naming a destination drops the chain", () => {
  const next = patchedRule(CHAINED, { destination: "craft-bag" })
  expect(next.destination).toBe("craft-bag")
  expect("destinationChain" in next).toBe(false)
})

test("a change naming neither leaves the one the rule states", () => {
  expect(patchedRule(CHAINED, { title: "Stock tools" }).destinationChain).toEqual(CHAIN)
  expect(patchedRule(FLAT, { title: "Stock tools" }).destination).toBe("bank")
})

test("an update and a bulk update each leave one destination form", () => {
  const settings = { version: 2 as const, rules: [FLAT] }
  const one = updateCategoryRule(settings, "one", { destinationChain: CHAIN }).rules[0]
  const bulk = bulkUpdateCategoryRules(settings, ["one"], { destinationChain: CHAIN }).rules[0]
  expect(one?.destination).toBeUndefined()
  expect(bulk?.destination).toBeUndefined()
})
