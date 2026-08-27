import { describe, expect, it } from "bun:test"
import { ESO_ITEMTYPE_RECIPE } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeContext, makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
  type ItemRule,
} from "@temper/game-items-rules-core/inventory-rule-types"
import { CharacterId } from "@temper/game-items-rules-core/use-destination-types"
import { computeAllRuleAffectedItems } from "./inventory-rule-matcher"

function classify(
  partialItem: Parameters<typeof makeItem>[0],
  nodeIds: readonly string[],
  overrides: Partial<Omit<ClassifiedInventoryItem, "item" | "nodeIds">> = {}
): ClassifiedInventoryItem {
  return {
    item: makeItem(partialItem),
    locationKey: overrides.locationKey ?? "1001",
    locationDisplayName: overrides.locationDisplayName ?? "Azara",
    nodeIds,
    bagId: overrides.bagId ?? 1,
  }
}

function rule(overrides: Partial<CategoryRule> & { id: string }): CompiledOrderedRule & {
  id: string
} {
  return {
    ...compileCategoryRuleToOrdered({
      categoryId: ALL_CATEGORIES_ID,
      action: "sell",
      ...overrides,
    }),
    id: overrides.id,
  }
}

describe("computeAllRuleAffectedItems", () => {
  describe("priority and first-match-wins", () => {
    it("claims an item by the first matching active rule", () => {
      const sword = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const r1 = rule({ id: "first", categoryId: "weapons", action: "sell" })
      const r2 = rule({ id: "second", categoryId: "weapons", action: "deconstruct" })

      const result = computeAllRuleAffectedItems([r1, r2], [sword])

      expect(result.ruleMap.get("first")?.map((a) => a.item.itemId)).toEqual([100])
      expect(result.ruleMap.get("second") ?? []).toEqual([])
    })

    it("does not claim items via an inactive rule, so the next rule may claim them", () => {
      const sword = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const inactive = rule({
        id: "first",
        categoryId: "weapons",
        action: "sell",
        active: false,
      })
      const active = rule({
        id: "second",
        categoryId: "weapons",
        action: "deconstruct",
      })

      const result = computeAllRuleAffectedItems([inactive, active], [sword])

      expect(result.ruleMap.get("first")?.map((a) => a.item.itemId)).toEqual([100])
      expect(result.ruleMap.get("second")?.map((a) => a.item.itemId)).toEqual([100])
      expect(result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []).toEqual([])
    })

    it("processes item rules before category rules — item-id targeting wins over a broad category match", () => {
      const sword = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const itemRule: ItemRule = {
        id: "item-r",
        itemId: 100,
        itemName: "Test Sword",
        action: "lock",
      }
      const broad = rule({ id: "broad", categoryId: "weapons", action: "sell" })

      const result = computeAllRuleAffectedItems([broad], [sword], undefined, [itemRule])

      expect(result.ruleMap.get("item-r")?.map((a) => a.item.itemId)).toEqual([100])
      expect(result.ruleMap.get("broad") ?? []).toEqual([])
    })
  })

  describe("rule map keying", () => {
    it("produces an entry keyed by every rule id (even when no items match)", () => {
      const item = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const r1 = rule({ id: "matches", categoryId: "weapons", action: "sell" })
      const r2 = rule({ id: "no-matches", categoryId: "consumables", action: "sell" })

      const result = computeAllRuleAffectedItems([r1, r2], [item])

      expect(result.ruleMap.has("matches")).toBe(true)
      expect(result.ruleMap.has("no-matches")).toBe(true)
      expect(result.ruleMap.get("no-matches")).toEqual([])
    })
  })

  describe("implicit terminal rule", () => {
    it("claims items not matched by any user rule under IMPLICIT_TERMINAL_RULE_ID", () => {
      const sword = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const food = classify({ itemId: 200 }, ["consumables", "food"])
      const r1 = rule({ id: "weapons-only", categoryId: "weapons", action: "sell" })

      const result = computeAllRuleAffectedItems([r1], [sword, food])

      expect(result.ruleMap.get("weapons-only")?.map((a) => a.item.itemId)).toEqual([100])
      expect(result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID)?.map((a) => a.item.itemId)).toEqual([
        200,
      ])
    })

    it("leaves the terminal bucket empty when an earlier rule already claimed the item", () => {
      const sword = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const r1 = rule({ id: "all-cat", categoryId: ALL_CATEGORIES_ID, action: "sell" })

      const result = computeAllRuleAffectedItems([r1], [sword])

      expect(result.ruleMap.get("all-cat")?.map((a) => a.item.itemId)).toEqual([100])
      expect(result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []).toEqual([])
    })
  })

  describe("destination exclusion", () => {
    it("flags items already at the rule's destination with `alreadyAtDestination`", () => {
      const inBackpack = classify({ itemId: 100 }, ["consumables", "potions"], {
        locationKey: "1001",
        bagId: 1,
      })
      const inBank = classify({ itemId: 101 }, ["consumables", "potions"], {
        locationKey: "Bank",
        bagId: 2,
      })
      const moveToBank = rule({
        id: "to-bank",
        categoryId: "consumables",
        action: "move-to",
        destination: "bank",
      })

      const result = computeAllRuleAffectedItems([moveToBank], [inBackpack, inBank])

      const affected = result.ruleMap.get("to-bank") ?? []
      const movable = affected.find((a) => a.item.itemId === 100)
      const stationary = affected.find((a) => a.item.itemId === 101)

      expect(movable?.alreadyAtDestination).toBe(false)
      expect(stationary?.alreadyAtDestination).toBe(true)
    })
  })

  describe("first-match-wins across multiple rules", () => {
    it("a single item appears in exactly one active rule's bucket", () => {
      const sword = classify({ itemId: 100 }, ["equipment", "weapons", "sword"])
      const r1 = rule({ id: "first", categoryId: "weapons", action: "sell" })
      const r2 = rule({ id: "second", categoryId: ALL_CATEGORIES_ID, action: "deconstruct" })
      const r3 = rule({ id: "third", categoryId: "sword", action: "lock" })

      const result = computeAllRuleAffectedItems([r1, r2, r3], [sword])

      const counts = [r1, r2, r3].map((r) => result.ruleMap.get(r.id)?.length ?? 0)
      expect(counts).toEqual([1, 0, 0])
    })
  })

  describe("use-by-priority unlockable per-unit allocation", () => {
    it("stack of 5 unknown recipes + 3 eligible chars + sell next → 3 use + 2 sell", () => {
      const ci: ClassifiedInventoryItem = {
        item: makeItem({
          itemId: 99001,
          itemName: "Recipe: Roast Venison",
          itemType: ESO_ITEMTYPE_RECIPE,
          stackCount: 5,
        }),
        locationKey: "Bank",
        locationDisplayName: "Bank",
        nodeIds: ["all", "consumables", "food"],
        bagId: 2,
      }
      const useRule = rule({
        id: "use-recipes",
        categoryId: ALL_CATEGORIES_ID,
        action: "use",
        destination: "character:by-priority",
      })
      const sellRule = rule({ id: "sell-rest", categoryId: ALL_CATEGORIES_ID, action: "sell" })

      const ctx = makeContext({ "1001": [], "1002": [], "1003": [] })

      const result = computeAllRuleAffectedItems([useRule, sellRule], [ci], ctx)

      const useEntries = result.ruleMap.get("use-recipes") ?? []
      const sellEntries = result.ruleMap.get("sell-rest") ?? []
      const terminal = result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []

      expect(useEntries).toHaveLength(1)
      expect(sellEntries).toHaveLength(1)
      expect(terminal).toEqual([])

      const useEntry = useEntries[0]
      const sellEntry = sellEntries[0]
      if (useEntry === undefined || sellEntry === undefined) {
        throw new Error("expected use and sell entries")
      }

      expect(useEntry.quantity).toBe(3)
      expect(useEntry.useAllocation).toBeDefined()
      expect(useEntry.useAllocation?.length).toBe(3)
      expect(new Set(useEntry.useAllocation ?? [])).toEqual(
        new Set([CharacterId("1001"), CharacterId("1002"), CharacterId("1003")])
      )

      expect(sellEntry.quantity).toBe(2)
      expect(sellEntry.useAllocation).toBeUndefined()

      expect(useEntry.item).toBe(ci.item)
      expect(sellEntry.item).toBe(ci.item)

      const totalConsumed =
        (useEntry.quantity ?? useEntry.item.stackCount) +
        (sellEntry.quantity ?? sellEntry.item.stackCount)
      expect(totalConsumed).toBe(5)
    })

    it("when no character is eligible, the use rule yields nothing and the next rule sees the full stack", () => {
      const ci: ClassifiedInventoryItem = {
        item: makeItem({
          itemId: 99001,
          itemName: "Recipe: Roast Venison",
          itemType: ESO_ITEMTYPE_RECIPE,
          stackCount: 4,
        }),
        locationKey: "Bank",
        locationDisplayName: "Bank",
        nodeIds: ["all", "consumables", "food"],
        bagId: 2,
      }
      const useRule = rule({
        id: "use-recipes",
        categoryId: ALL_CATEGORIES_ID,
        action: "use",
        destination: "character:by-priority",
      })
      const sellRule = rule({ id: "sell-rest", categoryId: ALL_CATEGORIES_ID, action: "sell" })

      const ctx = makeContext({ "1001": [28289], "1002": [28289] })

      const result = computeAllRuleAffectedItems([useRule, sellRule], [ci], ctx)

      expect(result.ruleMap.get("use-recipes") ?? []).toEqual([])
      const sellEntries = result.ruleMap.get("sell-rest") ?? []
      expect(sellEntries).toHaveLength(1)
      const sellEntry = sellEntries[0]
      if (sellEntry === undefined) throw new Error("expected sell entry")
      expect(sellEntry.quantity).toBeUndefined()
      expect(sellEntry.quantity ?? sellEntry.item.stackCount).toBe(4)
    })

    it("when stackCount equals eligible-char count, quantity is omitted (full stack consumed)", () => {
      const ci: ClassifiedInventoryItem = {
        item: makeItem({
          itemId: 99001,
          itemName: "Recipe: Roast Venison",
          itemType: ESO_ITEMTYPE_RECIPE,
          stackCount: 2,
        }),
        locationKey: "Bank",
        locationDisplayName: "Bank",
        nodeIds: ["all", "consumables", "food"],
        bagId: 2,
      }
      const useRule = rule({
        id: "use-recipes",
        categoryId: ALL_CATEGORIES_ID,
        action: "use",
        destination: "character:by-priority",
      })
      const ctx = makeContext({ "1001": [], "1002": [] })

      const result = computeAllRuleAffectedItems([useRule], [ci], ctx)

      const entries = result.ruleMap.get("use-recipes") ?? []
      expect(entries).toHaveLength(1)
      const entry = entries[0]
      if (entry === undefined) throw new Error("expected use entry")
      expect(entry.quantity).toBeUndefined()
      expect(entry.useAllocation?.length).toBe(2)
    })

    it("two stacks of the same recipe never both route to the same character (cross-stack claim-block)", () => {
      const ci1: ClassifiedInventoryItem = {
        item: makeItem({
          itemId: 99001,
          itemName: "Recipe: Roast Venison",
          itemType: ESO_ITEMTYPE_RECIPE,
          stackCount: 1,
        }),
        locationKey: "Bank",
        locationDisplayName: "Bank",
        nodeIds: ["all", "consumables", "food"],
        bagId: 2,
      }
      const ci2: ClassifiedInventoryItem = {
        item: makeItem({
          itemId: 99002,
          itemName: "Recipe: Roast Venison",
          itemType: ESO_ITEMTYPE_RECIPE,
          stackCount: 1,
        }),
        locationKey: "Bank",
        locationDisplayName: "Bank",
        nodeIds: ["all", "consumables", "food"],
        bagId: 2,
      }
      const useRule = rule({
        id: "use-recipes",
        categoryId: ALL_CATEGORIES_ID,
        action: "use",
        destination: "character:by-priority",
      })
      const ctx = makeContext({ "1001": [], "1002": [] })

      const result = computeAllRuleAffectedItems([useRule], [ci1, ci2], ctx)

      const entries = result.ruleMap.get("use-recipes") ?? []
      expect(entries).toHaveLength(2)
      const allChars: string[] = entries.flatMap((e) => Array.from(e.useAllocation ?? []))
      expect(new Set(allChars).size).toBe(allChars.length)
      expect(new Set(allChars)).toEqual(new Set(["1001", "1002"]))
    })
  })
})
