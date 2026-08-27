import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import { computeStockGroups } from "./compute-stock-groups"
import type { EvalEnv } from "./eval-env"
import type { ItemFacts } from "./item-facts"

const env: EvalEnv = {
  isKnownByCharacter: () => "unknown",
  isKnownByAnyCharacter: () => "unknown",
  isTraitResearched: () => "unknown",
  isCraftingRankBelowCap: () => "unknown",
  matchesWantedEquipment: () => "unknown",
  matchesWantedCompanionEquipment: () => "unknown",
  isCompanionWornSlotFilled: () => "unknown",
  findCharacterForWantedEquipment: () => "unknown",
  findCompanionForWantedEquipment: () => "unknown",
  getConsumableStock: () => "unknown",
  getConsumableWanters: () => "unknown",
  getBankStock: () => "unknown",
  getCooldownGroup: () => "unknown",
  isCooldownExpired: () => "unknown",
  getTransmuteCrystalAmount: () => "unknown",
  getTransmuteCrystalCap: () => "unknown",
  getKnownScripts: () => "unknown",
  getTotalScriptCount: () => "unknown",
  getCharacterPriority: () => "unknown",
  getCurrentCharacter: () => "unknown",
  getAllCharacters: () => "unknown",
}

function facts(itemId: number, category: string): ItemFacts {
  return {
    itemId,
    itemName: `item-${itemId}`,
    itemLink: `|H1:item:${itemId}:0|h|h`,
    categoryNodeIds: [category],
  }
}

const items: readonly ItemFacts[] = [
  facts(100, "potions"),
  facts(200, "potions"),
  facts(300, "food"),
]
const factsFor = (f: ItemFacts): ItemFacts => f

describe("computeStockGroups", () => {
  test("keys each stock-condition rule's matched itemIds by rule.id (stock-blind)", () => {
    const rules: readonly CompiledOrderedRule[] = [
      { id: "rA", categoryId: "potions", action: "nothing", allStocked: "all-stocked" },
      { id: "rC", categoryId: "potions", action: "stock", targetQuantity: 500 },
    ]
    const groups = computeStockGroups(rules, items, factsFor, env)
    expect([...(groups.get("rA") ?? [])].sort()).toEqual([100, 200])
    expect([...(groups.get("rC") ?? [])].sort()).toEqual([100, 200])
  })

  test("rules without a stock condition get no entry", () => {
    const rules: readonly CompiledOrderedRule[] = [
      { id: "rB", categoryId: "potions", action: "nothing" },
    ]
    const groups = computeStockGroups(rules, items, factsFor, env)
    expect(groups.has("rB")).toBe(false)
  })

  test("group membership respects category — out-of-category items are excluded", () => {
    const rules: readonly CompiledOrderedRule[] = [
      { id: "rFood", categoryId: "food", action: "nothing", allStocked: "all-stocked" },
    ]
    const groups = computeStockGroups(rules, items, factsFor, env)
    expect([...(groups.get("rFood") ?? [])]).toEqual([300])
  })

  test("a stock rule matching no items gets no entry", () => {
    const rules: readonly CompiledOrderedRule[] = [
      { id: "rNone", categoryId: "weapons", action: "nothing", allStocked: "all-stocked" },
    ]
    const groups = computeStockGroups(rules, items, factsFor, env)
    expect(groups.has("rNone")).toBe(false)
  })

  test("a stock rule without an id is skipped (cannot be keyed)", () => {
    const rules: readonly CompiledOrderedRule[] = [
      { categoryId: "potions", action: "nothing", allStocked: "all-stocked" },
    ]
    const groups = computeStockGroups(rules, items, factsFor, env)
    expect(groups.size).toBe(0)
  })
})
