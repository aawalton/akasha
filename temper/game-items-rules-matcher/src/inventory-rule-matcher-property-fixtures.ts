import { ESO_ITEMTYPE_RECIPE } from "@temper/game-items-core/inventory-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
  type ItemAction,
  type ItemRule,
} from "@temper/game-items-rules-core/inventory-rule-types"
import fc from "fast-check"

const CATEGORY_PATHS: readonly (readonly string[])[] = [
  ["all", "equipment", "weapons", "sword"],
  ["all", "equipment", "weapons", "dagger"],
  ["all", "equipment", "weapons", "bow"],
  ["all", "equipment", "armor", "heavy"],
  ["all", "equipment", "armor", "medium"],
  ["all", "equipment", "armor", "light"],
  ["all", "consumables", "food"],
  ["all", "consumables", "potion"],
  ["all", "treasure"],
] as const

const ALL_CATEGORY_IDS: readonly string[] = [
  "all",
  "equipment",
  "weapons",
  "sword",
  "dagger",
  "bow",
  "armor",
  "heavy",
  "medium",
  "light",
  "consumables",
  "food",
  "potion",
  "treasure",
] as const

const ACTIONS: readonly ItemAction[] = [
  "nothing",
  "sell",
  "lock",
  "unlock",
  "destroy",
  "deconstruct",
  "research",
  "use",
  "open",
  "list",
] as const

export const classifiedItemArb: fc.Arbitrary<ClassifiedInventoryItem> = fc
  .record({
    itemId: fc.integer({ min: 1, max: 100_000 }),
    pathIdx: fc.integer({ min: 0, max: CATEGORY_PATHS.length - 1 }),
    locationKey: fc.constantFrom("Bank", "1001", "1002", "CraftBag"),
    bagId: fc.integer({ min: 1, max: 4 }),
  })
  .map(({ itemId, pathIdx, locationKey, bagId }) => ({
    item: makeItem({ itemId, itemType: 1 }),
    locationKey,
    locationDisplayName: locationKey,
    nodeIds: [...(CATEGORY_PATHS[pathIdx] ?? [])],
    bagId,
  }))

export const categoryRuleArb: fc.Arbitrary<CategoryRule> = fc.record({
  id: fc.uuid(),
  categoryId: fc.constantFrom(...ALL_CATEGORY_IDS),
  action: fc.constantFrom(...ACTIONS),
  active: fc.option(fc.boolean(), { nil: undefined }),
})

export const itemRuleArb: fc.Arbitrary<ItemRule> = fc.record({
  id: fc.uuid(),
  itemId: fc.integer({ min: 1, max: 100_000 }),
  itemName: fc.constant("Test Item"),
  action: fc.constantFrom(...ACTIONS),
  active: fc.option(fc.boolean(), { nil: undefined }),
})

export function dedupeById<T extends { id: string }>(rules: readonly T[]): readonly T[] {
  const seen = new Set<string>()
  return rules.filter((r) => {
    if (seen.has(r.id)) return false
    seen.add(r.id)
    return true
  })
}

export const categoryRuleListArb = fc
  .array(categoryRuleArb, { maxLength: 8 })
  .map((rs) => dedupeById(rs))

export const itemRuleListArb = fc.array(itemRuleArb, { maxLength: 4 }).map((rs) => dedupeById(rs))

export const classifiedItemListArb = fc.array(classifiedItemArb, { maxLength: 25 })

export function ruleMatchesItem(rule: CategoryRule, item: ClassifiedInventoryItem): boolean {
  if (rule.categoryId === ALL_CATEGORIES_ID) return true
  return item.nodeIds.includes(rule.categoryId)
}

export function expectedClaimerId(
  item: ClassifiedInventoryItem,
  categoryRules: readonly CategoryRule[],
  itemRules: readonly ItemRule[]
): string {
  for (const r of itemRules) {
    if (r.active === false) continue
    if (r.itemId === item.item.itemId) return r.id
  }
  for (const r of categoryRules) {
    if (r.active === false) continue
    if (ruleMatchesItem(r, item)) return r.id
  }
  return IMPLICIT_TERMINAL_RULE_ID
}

export function activeClaimsByItem(
  items: readonly ClassifiedInventoryItem[],
  activeBucketIds: readonly string[],
  ruleMap: ReadonlyMap<string, ReadonlyArray<{ item: { itemId: number } }>>
): Map<ClassifiedInventoryItem, string[]> {
  const claims = new Map<ClassifiedInventoryItem, string[]>()
  for (const ci of items) claims.set(ci, [])
  for (const rid of activeBucketIds) {
    const bucket = ruleMap.get(rid) ?? []
    for (const a of bucket) {
      const ci = items.find((i) => i.item === a.item)
      if (ci) claims.get(ci)?.push(rid)
    }
  }
  return claims
}

export function recipeCI(stackCount: number): ClassifiedInventoryItem {
  return {
    item: {
      itemId: 99001,
      itemName: "Recipe: Roast Venison",
      itemLink: "",
      quality: 2,
      filterType: 1,
      itemType: ESO_ITEMTYPE_RECIPE,
      traitType: 0,
      requiredLevel: 1,
      requiredCP: 0,
      stackCount,
    },
    locationKey: "Bank",
    locationDisplayName: "Bank",
    nodeIds: ["all", "consumables", "food"],
    bagId: 2,
  }
}

export const stackCountArb = fc.integer({ min: 1, max: 8 })
export const eligibleCharCountArb = fc.integer({ min: 0, max: 4 })
