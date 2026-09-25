import { expect, test } from "bun:test"
import {
  besidePages,
  inventorySliceIn,
  parseSettings,
} from "akasha/temper/command/modules/inventory-settings-access/inventory-settings-access.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

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

const CATEGORY_RULE = { id: "cat-1", categoryId: "weapons", action: "sell", active: true } as const

test("the rules the write carries are left out, because a rule is a page", () => {
  const out = besidePages({}, { version: 2, rules: [CATEGORY_RULE] })
  expect(Object.hasOwn(out, "rules")).toBe(false)
  expect(out).toEqual({ version: 2 })
})

test("the rules an earlier write left in the blob are taken out", () => {
  const out = besidePages(
    { version: 2, rules: [{ id: "stale", categoryId: "armor", action: "nothing" }] },
    { version: 2, rules: [CATEGORY_RULE] }
  )
  expect(Object.hasOwn(out, "rules")).toBe(false)
  expect(out).toEqual({ version: 2 })
})

test("an item rule the write carries is left out, because an item rule is a page", () => {
  const out = besidePages({}, { version: 2, rules: [], itemRules: [ITEM_RULE] })
  expect(Object.hasOwn(out, "itemRules")).toBe(false)
})

test("a buy rule the write carries is left out, because a buy rule is a page", () => {
  const out = besidePages({}, { version: 2, rules: [], buyRules: [BUY_RULE] })
  expect(Object.hasOwn(out, "buyRules")).toBe(false)
})

test("a key the blob keeps that the write says nothing of stays", () => {
  const out = besidePages(
    { "managed-guild-banks": { managedGuildBanks: ["g1"] } },
    { version: 2, rules: [] }
  )
  expect(out["managed-guild-banks"]).toEqual({ managedGuildBanks: ["g1"] })
})

test("the item rules and buy rules an earlier write left in the blob are taken out", () => {
  const out = besidePages(
    { version: 2, itemRules: [ITEM_RULE], buyRules: [BUY_RULE] },
    { version: 2, rules: [] }
  )
  expect(out).toEqual({ version: 2 })
})

test("a key the write carries again is written over the one the blob keeps", () => {
  const kept: Record<string, unknown> = { version: 1 }
  const next: InventoryRuleSettings = { version: 2, rules: [] }
  expect(besidePages(kept, next).version).toBe(2)
})

const WHOLE_BLOB = {
  safety: { confirmActions: ["sell", "destroy", "buy"], openCooldownProtection: true },
  logging: { perfTracing: "minimal", actionReports: "verbose" },
  inventory: { version: 2, "managed-guild-banks": { managedGuildBanks: ["g1"] } },
  automation: { characters: {}, companions: {} },
}

test("a blob that is not there reads as an empty blob", () => {
  expect(parseSettings(undefined, "x")).toEqual({})
  expect(parseSettings(null, "x")).toEqual({})
  expect(parseSettings("", "x")).toEqual({})
})

test("every setting the blob holds survives the read, so a write carries the rest", () => {
  const held = parseSettings(JSON.stringify(WHOLE_BLOB), "x")
  expect(held).toEqual(WHOLE_BLOB)
  const out = besidePages(held.inventory as Record<string, unknown>, {
    version: 2,
    rules: [CATEGORY_RULE],
  })
  expect(out["managed-guild-banks"]).toEqual({ managedGuildBanks: ["g1"] })
})

test("a blob whose bytes are no JSON is refused rather than read as unset", () => {
  expect(() => parseSettings("{oops", "x")).toThrow("5 byte(s) that are not valid JSON")
  expect(() => parseSettings("{oops", "x")).toThrow("what is already set stays")
})

test("a blob that parses to something other than an object is refused", () => {
  for (const refused of ["[]", "null", "42", '"text"', "true"]) {
    expect(() => parseSettings(refused, "x")).toThrow("hold no JSON object")
  }
})

test("a blob answering as its file's ending is refused", () => {
  expect(() => parseSettings("json", "x")).toThrow("rather than the body")
})

test("a blob answering as anything but text is refused", () => {
  expect(() => parseSettings(42, "x")).toThrow("came back as a number")
  expect(() => parseSettings(["a"], "x")).toThrow("came back as a object")
})

test("a blob already read as an object is carried through", () => {
  expect(parseSettings(WHOLE_BLOB, "x")).toEqual(WHOLE_BLOB)
})

test("an inventory setting that is not there reads as an empty one", () => {
  expect(inventorySliceIn({}, "x")).toEqual({})
  expect(inventorySliceIn({ inventory: undefined }, "x")).toEqual({})
  expect(inventorySliceIn({ inventory: null }, "x")).toEqual({})
})

test("the inventory setting the blob holds is carried through whole", () => {
  expect(inventorySliceIn(WHOLE_BLOB, "x")).toEqual(WHOLE_BLOB.inventory)
})

test("an inventory setting that is no object is refused rather than read as unset", () => {
  for (const refused of ["text", 42, true, [ITEM_RULE]]) {
    expect(() => inventorySliceIn({ inventory: refused }, "x")).toThrow(
      "rather than an object, so a write now would go over what they hold"
    )
  }
})
