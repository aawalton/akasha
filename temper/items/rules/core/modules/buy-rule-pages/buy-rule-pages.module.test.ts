import { expect, test } from "bun:test"
import {
  buyRulePageOf,
  buyRulesFromRows,
  buyRuleWritesFor,
} from "akasha/temper/items/rules/core/modules/buy-rule-pages/buy-rule-pages.module.code.ts"
import type { BuyRule } from "akasha/temper/items/rules/core/modules/buy-rule-types/buy-rule-types.module.code.ts"
import { alanarre } from "akasha/temper/player/character/temper-account/pages/alanarre/alanarre.temper-account.ts"
import { temperAccount } from "akasha/temper/player/character/temper-account/temper-account.page-type.ts"

const ACCOUNT = `${temperAccount.slug}/${alanarre.slug}`

const WRITTEN_AT = 1790000000000

function ruleOf(over: Partial<BuyRule> = {}): BuyRule {
  return {
    id: "0e353660-3bf3-427e-85e4-79c825c695a7",
    itemId: 30357,
    itemName: "Lockpick",
    targetQuantity: 4000,
    source: "merchant",
    active: true,
    updatedAt: 1780316148618,
    ...over,
  }
}

function rowOf(rule: BuyRule, at = 0): Record<string, unknown> {
  return { ...buyRulePageOf(rule, ACCOUNT, at, WRITTEN_AT).values }
}

test("a buy rule read back from its page is the rule written", () => {
  const rule = ruleOf({ goal: "use", title: "Picks", notes: "always", locked: true })
  expect(buyRulesFromRows([rowOf(rule)])).toEqual([rule])
})

test("a buy rule page names its account and its item, and states no source", () => {
  const values = buyRulePageOf(ruleOf(), ACCOUNT, 2, WRITTEN_AT).values
  expect(values.slug).toBe("buy-rule-0e353660-3bf3-427e-85e4-79c825c695a7")
  expect(values.accountPage).toBe(ACCOUNT)
  expect(values.itemId).toBe(30357)
  expect(values.name).toBe("Lockpick")
  expect(values.targetQuantity).toBe(4000)
  expect("source" in values).toBe(false)
})

test("a buy rule keeping no count bought is refused", () => {
  expect(() => buyRulePageOf(ruleOf({ targetQuantity: 1.5 }), ACCOUNT, 0, WRITTEN_AT)).toThrow(
    "no count"
  )
})

test("a buy rule edited is written again, and one removed is taken away", () => {
  const kept = ruleOf()
  const gone = ruleOf({ id: "eeee5555", itemId: 7, itemName: "Seven" })
  const writes = buyRuleWritesFor(
    [ruleOf({ targetQuantity: 500 })],
    [rowOf(kept), rowOf(gone, 1)],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(writes.upserts.map((one) => one.values.targetQuantity)).toEqual([500])
  expect(writes.deletes).toEqual(["buy-rule-eeee5555"])
})
