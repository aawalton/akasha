import { expect, test } from "bun:test"
import type { ItemRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  itemRulePageOf,
  itemRulesFromRows,
  itemRuleWritesFor,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"
import { alanarre } from "akasha/temper/player/character/temper-account/pages/alanarre/alanarre.temper-account.ts"
import { temperAccount } from "akasha/temper/player/character/temper-account/temper-account.page-type.ts"
import { stock } from "akasha/temper/player/progress/temper-item-action/pages/stock.temper-item-action.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

const ACCOUNT = `${temperAccount.slug}/${alanarre.slug}`

const WRITTEN_AT = 1790000000000

function ruleOf(over: Partial<ItemRule> = {}): ItemRule {
  return {
    id: "32c22942-9127-47a9-9754-f877b356132b",
    itemId: 87697,
    itemName: "Witchmother's Potent Brew",
    action: "stock",
    active: true,
    updatedAt: 1783274045504,
    ...over,
  }
}

function rowOf(rule: ItemRule, at = 0): Record<string, unknown> {
  return { ...itemRulePageOf(rule, ACCOUNT, at, WRITTEN_AT).values }
}

test("an item rule read back from its page is the rule written", () => {
  const rule = ruleOf({
    destination: "character:by-priority",
    stockQuantity: 100,
    goal: "use",
    title: "Brew",
    notes: "for the road",
    locked: true,
  })
  expect(itemRulesFromRows([rowOf(rule)])).toEqual([rule])
})

test("an item rule page names its account, its item and its action as pages", () => {
  const values = itemRulePageOf(ruleOf(), ACCOUNT, 3, WRITTEN_AT).values
  expect(values.slug).toBe("item-rule-32c22942-9127-47a9-9754-f877b356132b")
  expect(values.accountPage).toBe(ACCOUNT)
  expect(values.itemId).toBe(87697)
  expect(values.name).toBe("Witchmother's Potent Brew")
  expect(values.action).toBe(`${temperItemAction.slug}/${stock.slug}`)
  expect(values.displayOrder).toBe(3)
})

test("item rules are read in display order", () => {
  const first = ruleOf({ id: "aaaa1111", itemId: 1, itemName: "One" })
  const second = ruleOf({ id: "bbbb2222", itemId: 2, itemName: "Two" })
  const read = itemRulesFromRows([rowOf(second, 1), rowOf(first, 0)])
  expect(read.map((one) => one.id)).toEqual(["aaaa1111", "bbbb2222"])
})

test("a chain of destinations is carried through the page", () => {
  const rule = ruleOf({
    destinationChain: [
      { destination: "character:by-priority", targetQuantity: 20 },
      { destination: "bank" },
    ],
  })
  expect(itemRulesFromRows([rowOf(rule)])).toEqual([rule])
})

test("a chain whose landed rows carry ids is no change", () => {
  const rule = ruleOf({ destinationChain: [{ destination: "bank" }] })
  const row = rowOf(rule)
  const landed = { ...row, destinationChain: [{ id: "a-row-id", destination: "bank" }] }
  expect(itemRuleWritesFor([rule], [landed], ACCOUNT, WRITTEN_AT).upserts).toEqual([])
})

test("a rule stating both a destination and a chain is refused", () => {
  const rule = ruleOf({ destination: "bank", destinationChain: [{ destination: "bank" }] })
  expect(() => itemRulePageOf(rule, ACCOUNT, 0, WRITTEN_AT)).toThrow("both a destination")
})

test("a rule naming no item's number is refused", () => {
  expect(() => itemRulePageOf(ruleOf({ itemId: 0 }), ACCOUNT, 0, WRITTEN_AT)).toThrow(
    "no item's number"
  )
})

test("a rule naming a goal no goal page is is refused", () => {
  expect(() => itemRulePageOf(ruleOf({ goal: "win" }), ACCOUNT, 0, WRITTEN_AT)).toThrow(
    "names the goal"
  )
})

test("a rule naming an action no action page is is refused", () => {
  const rule = ruleOf({ action: "juggle" as ItemRule["action"] })
  expect(() => itemRulePageOf(rule, ACCOUNT, 0, WRITTEN_AT)).toThrow("gives its item")
})

test("a new item rule is written, and a rule no longer wanted is taken away", () => {
  const kept = ruleOf()
  const gone = ruleOf({ id: "cccc3333", itemId: 5, itemName: "Five" })
  const added = ruleOf({ id: "dddd4444", itemId: 6, itemName: "Six" })
  const writes = itemRuleWritesFor(
    [kept, added],
    [rowOf(kept), rowOf(gone, 1)],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(writes.upserts.map((one) => one.slug)).toEqual(["item-rule-dddd4444"])
  expect(writes.deletes).toEqual(["item-rule-cccc3333"])
})

test("an item rule the page already says is written again by nothing", () => {
  const rule = ruleOf({ stockQuantity: 100 })
  expect(itemRuleWritesFor([rule], [rowOf(rule)], ACCOUNT, WRITTEN_AT)).toEqual({
    upserts: [],
    deletes: [],
  })
})

test("a field an item rule dropped is cleared from its page", () => {
  const was = ruleOf({ title: "Brew", stockQuantity: 100 })
  const writes = itemRuleWritesFor([ruleOf()], [rowOf(was)], ACCOUNT, WRITTEN_AT)
  expect(writes.upserts[0]?.clears).toEqual(["title", "stockQuantity"])
})

test("a chain an item rule dropped empties the rows beside its page", () => {
  const was = ruleOf({ destinationChain: [{ destination: "bank" }] })
  const writes = itemRuleWritesFor([ruleOf()], [rowOf(was)], ACCOUNT, WRITTEN_AT)
  expect(writes.upserts[0]?.values.destinationChain).toEqual([])
})
