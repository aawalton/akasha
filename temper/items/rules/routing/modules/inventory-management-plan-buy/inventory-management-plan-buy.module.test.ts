import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import {
  makeContext,
  makeItem,
} from "akasha/temper/items/rules/core/test-fixtures/inventory-rule-test-utils/inventory-rule-test-utils.test-fixture.code.ts"
import { buyShortfallsOf } from "akasha/temper/items/rules/routing/modules/inventory-management-plan-buy/inventory-management-plan-buy.module.code.ts"

const LOCKPICK = 30357

const RULE: CompiledOrderedRule = {
  id: "lockpicks",
  categoryId: "lockpicks",
  action: "stock",
  buyShortfall: true,
  destinationChain: [
    { destination: "character:by-priority", targetQuantity: 200 },
    { destination: "bank", targetQuantity: 1800 },
  ],
}

const CONTEXT = makeContext({}, ["1111", "2222"])

function held(locationKey: string, stackCount: number): AffectedItem {
  return {
    item: makeItem({ itemId: LOCKPICK, itemName: "Lockpick", stackCount }),
    locationKey,
    locationDisplayName: locationKey,
    bagId: 1,
    alreadyAtDestination: true,
  }
}

function shortOf(
  rule: CompiledOrderedRule,
  entries: readonly AffectedItem[]
): ReturnType<typeof buyShortfallsOf> {
  return buyShortfallsOf([rule], new Map([[rule.id ?? "", entries]]), CONTEXT)
}

test("a rule is short of its chain's target less what characters, bank and house storage hold", () => {
  const said = shortOf(RULE, [held("1111", 150), held("Bank", 1000), held("HouseBank:Chest", 50)])
  expect(said).toEqual([{ itemId: LOCKPICK, itemName: "Lockpick", quantity: 2200 - 1200 }])
})

test("what a guild bank or a companion holds counts toward nothing", () => {
  const said = shortOf(RULE, [held("1111", 100), held("Walton Mountain", 5000)])
  expect(said[0]?.quantity).toBe(2100)
})

test("a rule holding its target adds no errand", () => {
  expect(shortOf(RULE, [held("Bank", 2200)])).toEqual([])
})

test("a rule not buying its shortfall, switched off or not stocking adds no errand", () => {
  const entries = [held("1111", 1)]
  expect(shortOf({ ...RULE, buyShortfall: undefined }, entries)).toEqual([])
  expect(shortOf({ ...RULE, active: false }, entries)).toEqual([])
  expect(shortOf({ ...RULE, action: "move-to" }, entries)).toEqual([])
})

test("a rule naming item ids is planned as buying the first of them", () => {
  const potions: CompiledOrderedRule = { ...RULE, id: "potions", itemIds: [64710, 27036] }
  expect(shortOf(potions, [])[0]?.itemId).toBe(64710)
})

test("a rule naming no item ids and holding nothing has nothing to name, so adds no errand", () => {
  expect(shortOf(RULE, [])).toEqual([])
})

test("a chain with no by-priority leg has no target, so adds no errand", () => {
  const banked: CompiledOrderedRule = { ...RULE, destinationChain: [{ destination: "bank" }] }
  expect(shortOf(banked, [held("1111", 1)])).toEqual([])
})
