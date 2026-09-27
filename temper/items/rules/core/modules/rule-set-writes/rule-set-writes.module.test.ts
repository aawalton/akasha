import { expect, test } from "bun:test"
import type {
  InventoryRules,
  ItemRule,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  ITEM_RULE_PAGE_TYPE,
  itemRulePageOf,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"
import {
  type HeldPages,
  heldPagesOf,
  ruleSetOf,
  ruleWritesFor,
} from "akasha/temper/items/rules/core/modules/rule-set-writes/rule-set-writes.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { alanarre } from "akasha/temper/player/character/temper-account/pages/alanarre/alanarre.temper-account.ts"
import { temperAccount } from "akasha/temper/player/character/temper-account/temper-account.page-type.ts"

holdSkillCatalogFromCheckout()

const ACCOUNT = `${temperAccount.slug}/${alanarre.slug}`

const WRITTEN_AT = 1790000000000

const AN_ITEM_RULE: ItemRule = {
  id: "32c22942",
  itemId: 87697,
  itemName: "Witchmother's Potent Brew",
  action: "stock",
  active: true,
  updatedAt: 1783274045504,
  stockQuantity: 100,
}

const HELD: HeldPages = heldPagesOf(
  [],
  [itemRulePageOf(AN_ITEM_RULE, ACCOUNT, 0, WRITTEN_AT).values]
)

function writesTo(pageTypeSlug: string, next: InventoryRules) {
  return ruleWritesFor(next, HELD, ACCOUNT, WRITTEN_AT).find(
    (one) => one.pageTypeSlug === pageTypeSlug
  )?.writes
}

test("the rule set read from the pages holds the item rules", () => {
  expect(ruleSetOf(HELD)).toEqual({
    version: 2,
    rules: [],
    itemRules: [AN_ITEM_RULE],
  })
})

test("an item rule edited is saved to its item rule page", () => {
  const writes = writesTo(ITEM_RULE_PAGE_TYPE, {
    ...ruleSetOf(HELD),
    itemRules: [{ ...AN_ITEM_RULE, stockQuantity: 50 }],
  })
  expect(writes?.upserts.map((one) => [one.slug, one.values.stockQuantity])).toEqual([
    ["item-rule-32c22942", 50],
  ])
  expect(writes?.deletes).toEqual([])
})

test("an item rule removed takes its page away", () => {
  const writes = writesTo(ITEM_RULE_PAGE_TYPE, { ...ruleSetOf(HELD), itemRules: [] })
  expect(writes?.deletes).toEqual(["item-rule-32c22942"])
})

test("a save that edits nothing writes no page", () => {
  for (const one of ruleWritesFor(ruleSetOf(HELD), HELD, ACCOUNT, WRITTEN_AT)) {
    expect(one.writes).toEqual({ upserts: [], deletes: [] })
  }
})

test("a set saying nothing of item rules leaves those pages alone", () => {
  const all = ruleWritesFor({ version: 2, rules: [] }, HELD, ACCOUNT, WRITTEN_AT)
  expect(all.map((one) => one.pageTypeSlug)).toEqual(["temper-inventory-rule"])
})
