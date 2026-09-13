import { expect, test } from "bun:test"
import { besidePages } from "akasha/temper/commands/modules/inventory-settings-access/inventory-settings-access.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const ITEM_RULE = {
  id: "32c22942",
  itemId: 87697,
  itemName: "Witchmother's Potent Brew",
  action: "stock",
} as const

const BUY_RULE = {
  id: "0e353660",
  itemId: 30357,
  itemName: "Lockpick",
  targetQuantity: 4000,
  source: "merchant",
} as const

const CATEGORY_RULE = { id: "cat-1", categoryId: "weapons", action: "sell" } as const

test("the rules the write carries are left out, because a rule is a page", () => {
  const out = besidePages({}, { version: 2, rules: [CATEGORY_RULE] })
  expect(Object.hasOwn(out, "rules")).toBe(false)
  expect(out).toEqual({ version: 2 })
})

test("the rules the blob already keeps are left as they were", () => {
  const out = besidePages(
    { version: 2, rules: [{ id: "stale", categoryId: "armor", action: "nothing" }] },
    { version: 2, rules: [CATEGORY_RULE] }
  )
  expect(out.rules).toEqual([{ id: "stale", categoryId: "armor", action: "nothing" }])
})

test("an item rule the write carries lands in the blob", () => {
  const out = besidePages({}, { version: 2, rules: [], itemRules: [ITEM_RULE] })
  expect(out.itemRules).toEqual([ITEM_RULE])
})

test("a buy rule the write carries lands in the blob", () => {
  const out = besidePages({}, { version: 2, rules: [], buyRules: [BUY_RULE] })
  expect(out.buyRules).toEqual([BUY_RULE])
})

test("a key the blob keeps that the write says nothing of stays", () => {
  const out = besidePages(
    { "managed-guild-banks": { managedGuildBanks: ["g1"] } },
    { version: 2, rules: [] }
  )
  expect(out["managed-guild-banks"]).toEqual({ managedGuildBanks: ["g1"] })
})

test("a key the write carries as undefined leaves what the blob keeps", () => {
  const out = besidePages(
    { itemRules: [ITEM_RULE] },
    { version: 2, rules: [], itemRules: undefined }
  )
  expect(out.itemRules).toEqual([ITEM_RULE])
})

test("a key the write carries again is written over the one the blob keeps", () => {
  const kept: Record<string, unknown> = { version: 1, itemRules: [] }
  const next: InventoryRuleSettings = { version: 2, rules: [], itemRules: [ITEM_RULE] }
  const out = besidePages(kept, next)
  expect(out.version).toBe(2)
  expect(out.itemRules).toEqual([ITEM_RULE])
})
