import { describe, expect, it } from "bun:test"
import { isJson } from "../../../shared/utils-narrow/src/is-json"
import {
  addCategoryRule,
  bulkUpdateCategoryRules,
  reorderCategoryRule,
  resolveAnchorIndex,
  updateCategoryRule,
  upsertItemRuleByItemId,
} from "./inventory-rule-settings"
import type { CategoryRule, InventoryRuleSettings } from "./inventory-rule-types"

function rule(id: string): CategoryRule {
  return { id, categoryId: "misc", action: "nothing" }
}

function settingsWith(ids: readonly string[]): InventoryRuleSettings {
  return { version: 2, rules: ids.map(rule) }
}

function ruleIds(settings: InventoryRuleSettings): readonly string[] {
  return settings.rules.map((r) => r.id)
}

describe("addCategoryRule — JSON-clean by construction", () => {
  const base: InventoryRuleSettings = { version: 2, rules: [] }

  it("produces an isJson-accepted settings object when optionals are explicit undefined", () => {
    const next = addCategoryRule(base, {
      categoryId: "recipes",
      action: "sell",
      conditions: undefined,
      destination: undefined,
      stockScope: undefined,
      goal: undefined,
    })
    expect(isJson(next)).toBe(true)
  })

  it("retains no undefined-valued keys on the created rule", () => {
    const next = addCategoryRule(base, {
      categoryId: "recipes",
      action: "sell",
      conditions: undefined,
      destination: undefined,
      stockScope: undefined,
      goal: undefined,
    })
    const created = next.rules[next.rules.length - 1]
    expect(created).toBeDefined()
    if (created === undefined) return
    for (const [key, value] of Object.entries(created)) {
      expect(value, `key '${key}' should not be undefined`).not.toBeUndefined()
    }
    expect(Object.hasOwn(created, "conditions")).toBe(false)
    expect(Object.hasOwn(created, "destination")).toBe(false)
    expect(Object.hasOwn(created, "stockScope")).toBe(false)
    expect(Object.hasOwn(created, "goal")).toBe(false)
  })

  it("keeps defined optionals (destination) while stripping undefined ones", () => {
    const next = addCategoryRule(base, {
      categoryId: "equipment",
      action: "move-to",
      destination: "bank",
      conditions: undefined,
      stockScope: undefined,
      goal: undefined,
    })
    expect(isJson(next)).toBe(true)
    const created = next.rules[next.rules.length - 1]
    expect(created?.destination).toBe("bank")
    expect(Object.hasOwn(created ?? {}, "stockScope")).toBe(false)
  })

  it("preserves an explicit null goal (JSON-valid, distinct from undefined)", () => {
    const next = addCategoryRule(base, {
      categoryId: "recipes",
      action: "sell",
      goal: null,
    })
    expect(isJson(next)).toBe(true)
    const created = next.rules[next.rules.length - 1]
    expect(created?.goal).toBeNull()
  })
})

describe("updateCategoryRule — JSON-clean by construction", () => {
  const start: InventoryRuleSettings = {
    version: 2,
    rules: [{ id: "r1", categoryId: "misc", action: "nothing" }],
  }

  it("does not introduce undefined-valued keys from an explicit-undefined patch", () => {
    const next = updateCategoryRule(start, "r1", {
      action: "sell",
      destination: undefined,
      conditions: undefined,
      goal: undefined,
    })
    expect(isJson(next)).toBe(true)
    const updated = next.rules.find((r) => r.id === "r1")
    expect(updated?.action).toBe("sell")
    expect(Object.hasOwn(updated ?? {}, "destination")).toBe(false)
    expect(Object.hasOwn(updated ?? {}, "conditions")).toBe(false)
  })
})

describe("bulkUpdateCategoryRules — JSON-clean by construction", () => {
  const start: InventoryRuleSettings = {
    version: 2,
    rules: [{ id: "r1", categoryId: "food", action: "stock", stockScope: "any-character" }],
  }

  it("strips the clearScalarDestination undefined while applying the chain", () => {
    const next = bulkUpdateCategoryRules(start, ["r1"], {
      destinationChain: [
        { destination: "bank", targetQuantity: 200 },
        { destination: "guild-bank" },
      ],
      destination: undefined,
    })
    expect(isJson(next)).toBe(true)
    const updated = next.rules.find((r) => r.id === "r1")
    expect(updated?.destinationChain?.length).toBe(2)
    expect(Object.hasOwn(updated ?? {}, "destination")).toBe(false)
  })
})

describe("resolveAnchorIndex", () => {
  it("'before' an anchor that follows the moved rule resolves to the post-removal anchor index", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    expect(resolveAnchorIndex(settings, "a", "c", "before")).toBe(1)
  })

  it("'after' an anchor that follows the moved rule resolves to anchor index + 1", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    expect(resolveAnchorIndex(settings, "a", "c", "after")).toBe(2)
  })

  it("'before' an anchor that precedes the moved rule resolves correctly", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    expect(resolveAnchorIndex(settings, "d", "b", "before")).toBe(1)
  })

  it("'after' an anchor that precedes the moved rule resolves to anchor index + 1", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    expect(resolveAnchorIndex(settings, "d", "b", "after")).toBe(2)
  })

  it("returns undefined when the anchor id is not a user rule", () => {
    const settings = settingsWith(["a", "b", "c"])
    expect(resolveAnchorIndex(settings, "a", "controlled-x", "before")).toBeUndefined()
  })

  it("returns undefined when the anchor equals the moved rule", () => {
    const settings = settingsWith(["a", "b", "c"])
    expect(resolveAnchorIndex(settings, "b", "b", "before")).toBeUndefined()
  })
})

describe("resolveAnchorIndex → reorderCategoryRule", () => {
  it("'before' yields the moved rule immediately before the anchor", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    const toIndex = resolveAnchorIndex(settings, "a", "c", "before")
    expect(toIndex).toBeDefined()
    if (toIndex === undefined) return
    const next = reorderCategoryRule(settings, "a", toIndex)
    expect(ruleIds(next)).toEqual(["b", "a", "c", "d"])
  })

  it("'after' yields the moved rule immediately after the anchor", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    const toIndex = resolveAnchorIndex(settings, "a", "c", "after")
    expect(toIndex).toBeDefined()
    if (toIndex === undefined) return
    const next = reorderCategoryRule(settings, "a", toIndex)
    expect(ruleIds(next)).toEqual(["b", "c", "a", "d"])
  })

  it("'before' a backward anchor yields the moved rule immediately before it", () => {
    const settings = settingsWith(["a", "b", "c", "d"])
    const toIndex = resolveAnchorIndex(settings, "d", "b", "before")
    expect(toIndex).toBeDefined()
    if (toIndex === undefined) return
    const next = reorderCategoryRule(settings, "d", toIndex)
    expect(ruleIds(next)).toEqual(["a", "d", "b", "c"])
  })
})

describe("upsertItemRuleByItemId", () => {
  const base: InventoryRuleSettings = { version: 2, rules: [] }

  it("prepends a new rule when no rule exists for the itemId", () => {
    const next = upsertItemRuleByItemId(base, { itemId: 42, itemName: "Foo", action: "sell" })
    expect(next.itemRules?.length).toBe(1)
    const r = next.itemRules?.[0]
    expect(r?.itemId).toBe(42)
    expect(r?.itemName).toBe("Foo")
    expect(r?.action).toBe("sell")
  })

  it("replaces the action in place for an existing itemId without duplicating", () => {
    const start = upsertItemRuleByItemId(base, { itemId: 42, itemName: "Foo", action: "sell" })
    const startId = start.itemRules?.[0]?.id
    const next = upsertItemRuleByItemId(start, { itemId: 42, itemName: "Foo", action: "nothing" })
    expect(next.itemRules?.length).toBe(1)
    expect(next.itemRules?.[0]?.action).toBe("nothing")
    expect(next.itemRules?.[0]?.id).toBe(startId)
  })

  it("leaves sibling item rules untouched", () => {
    const one = upsertItemRuleByItemId(base, { itemId: 1, itemName: "A", action: "sell" })
    const two = upsertItemRuleByItemId(one, { itemId: 2, itemName: "B", action: "nothing" })
    const next = upsertItemRuleByItemId(two, { itemId: 1, itemName: "A", action: "nothing" })
    expect(next.itemRules?.length).toBe(2)
    expect(next.itemRules?.find((r) => r.itemId === 2)?.action).toBe("nothing")
    expect(next.itemRules?.find((r) => r.itemId === 1)?.action).toBe("nothing")
  })

  it("does not modify a locked rule for the itemId (lock protects from edits)", () => {
    const start: InventoryRuleSettings = {
      version: 2,
      rules: [],
      itemRules: [{ id: "x", itemId: 7, itemName: "Locked", action: "sell", locked: true }],
    }
    const next = upsertItemRuleByItemId(start, { itemId: 7, itemName: "Locked", action: "nothing" })
    expect(next.itemRules?.length).toBe(1)
    expect(next.itemRules?.[0]?.action).toBe("sell")
  })
})
