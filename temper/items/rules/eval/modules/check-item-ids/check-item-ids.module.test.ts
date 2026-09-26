import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { checkItemIds } from "akasha/temper/items/rules/eval/modules/check-item-ids/check-item-ids.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"

const CTX = {} as EvalContext

const AN_ELIXIR: ItemFacts = {
  itemId: 112427,
  itemName: "Gold Coast Spellcaster Elixir",
  itemLink: "|H1:item:112427:123:1:0:0|h|h",
}

function ruleHolding(itemIds: unknown): CompiledOrderedRule {
  const rule: CompiledOrderedRule = { categoryId: "potions", action: "stock" }
  return Object.assign(rule, { itemIds })
}

test("a rule stating no item ids is skipped", () => {
  expect(checkItemIds(ruleHolding(undefined), AN_ELIXIR, CTX).kind).toBe("skip")
})

test("an item whose id is listed passes wherever the list puts it", () => {
  expect(checkItemIds(ruleHolding([176040, 112427]), AN_ELIXIR, CTX).kind).toBe("pass")
})

test("an item whose id is not listed fails", () => {
  expect(checkItemIds(ruleHolding([176040, 27037]), AN_ELIXIR, CTX).kind).toBe("fail")
})

test("a bare id where a list belongs names the rule's fault", () => {
  expect(checkItemIds(ruleHolding(112427), AN_ELIXIR, CTX).kind).toBe("misshapen")
})
