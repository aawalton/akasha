import { describe, expect, test } from "bun:test"
import type { ClassifiedInventoryItem } from "akasha/temper/items-rules-core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { makeContext } from "akasha/temper/items-rules-core/modules/inventory-rule-test-utils/inventory-rule-test-utils.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
} from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { compile } from "akasha/temper/items-rules-matcher/modules/compile-rules/compile-rules.module.code.ts"
import { computeAllRuleAffectedItems } from "akasha/temper/items-rules-matcher/modules/inventory-rule-matcher/inventory-rule-matcher.module.code.ts"
import {
  ELIGIBLE_CHAR_COUNT_ARB,
  recipeCI,
  STACK_COUNT_ARB,
} from "akasha/temper/items-rules-matcher/modules/inventory-rule-matcher-property-fixtures/inventory-rule-matcher-property-fixtures.module.code.ts"
import fc from "fast-check"

const SELL_RULE: CategoryRule = {
  id: "sell",
  categoryId: ALL_CATEGORIES_ID,
  action: "sell",
  active: true,
}

const USE_RULE: CategoryRule = {
  id: "use",
  categoryId: ALL_CATEGORIES_ID,
  action: "use",
  destination: "character:by-priority",
  active: true,
}

function stockRule(targetQuantity: number, anyCharacter = false): CategoryRule {
  return {
    id: "stock",
    categoryId: ALL_CATEGORIES_ID,
    action: "stock",
    destination: "character:by-priority",
    ...(anyCharacter ? { stockScope: "any-character" as const } : {}),
    conditions: { targetQuantity },
    active: true,
  }
}

function stockable(itemId: number, stackCount: number): ClassifiedInventoryItem {
  return {
    item: {
      itemId,
      itemName: "Generic Stockable",
      itemLink: "",
      quality: 2,
      filterType: 1,
      itemType: 1,
      traitType: 0,
      requiredLevel: 1,
      requiredCP: 0,
      stackCount,
    },
    locationKey: "Bank",
    locationDisplayName: "Bank",
    nodeIds: ["all", "consumables", "potion"],
    bagId: 2,
  }
}

function charactersKnowing(
  eligibleCount: number,
  known: readonly number[] = []
): Record<string, number[]> {
  const knownByChar: Record<string, number[]> = {}
  for (let at = 0; at < eligibleCount; at += 1) knownByChar[`100${String(at + 1)}`] = []
  knownByChar["1099"] = [...known]
  return knownByChar
}

function unitsIn(
  found: ReturnType<typeof computeAllRuleAffectedItems>,
  bucketId: string,
  only?: ClassifiedInventoryItem
): number {
  let units = 0
  for (const affected of found.ruleMap.get(bucketId) ?? []) {
    if (only !== undefined && affected.item !== only.item) continue
    units += affected.quantity ?? affected.item.stackCount
  }
  return units
}

function charactersServed(
  found: ReturnType<typeof computeAllRuleAffectedItems>,
  bucketId: string
): readonly string[] {
  const served: string[] = []
  for (const affected of found.ruleMap.get(bucketId) ?? []) {
    for (const character of affected.useAllocation ?? []) served.push(character)
  }
  return served
}

describe("A rule takes no larger amount of an item than the rule asked for.", () => {
  test("a use rule and a sell rule below it divide the whole stack between them", () => {
    fc.assert(
      fc.property(STACK_COUNT_ARB, ELIGIBLE_CHAR_COUNT_ARB, (stackCount, eligibleCount) => {
        const item = recipeCI(stackCount)
        const context = makeContext(charactersKnowing(eligibleCount, [28289]))
        const found = computeAllRuleAffectedItems(compile([USE_RULE, SELL_RULE]), [item], context)
        const units =
          unitsIn(found, "use", item) +
          unitsIn(found, "sell", item) +
          unitsIn(found, IMPLICIT_TERMINAL_RULE_ID, item)
        expect(units).toBe(stackCount)
      })
    )
  })

  test("a stock rule and a sell rule below it divide the whole stack between them", () => {
    fc.assert(
      fc.property(STACK_COUNT_ARB, ELIGIBLE_CHAR_COUNT_ARB, (stackCount, eligibleCount) => {
        const item = stockable(80_001, stackCount)
        const knownByChar = charactersKnowing(eligibleCount)
        const found = computeAllRuleAffectedItems(
          compile([stockRule(5, true), SELL_RULE]),
          [item],
          makeContext(knownByChar)
        )
        const units =
          unitsIn(found, "stock", item) +
          unitsIn(found, "sell", item) +
          unitsIn(found, IMPLICIT_TERMINAL_RULE_ID, item)
        expect(units).toBe(stackCount)
      })
    )
  })

  test("a stock rule takes its target for each character and the rest falls through", () => {
    fc.assert(
      fc.property(STACK_COUNT_ARB, (stackCount) => {
        const item = stockable(80_002, stackCount)
        const context = makeContext({ "1001": [], "1002": [] })
        const found = computeAllRuleAffectedItems(
          compile([stockRule(3), SELL_RULE]),
          [item],
          context
        )
        const stocked = Math.min(stackCount, 2 * 3)
        expect(unitsIn(found, "stock", item)).toBe(stocked)
        expect(unitsIn(found, "sell", item)).toBe(stackCount - stocked)
      })
    )
  })
})

describe("An allocation is charged against the character the allocation is meant for.", () => {
  test("one stock rule caps what a character holds across every item it matches", () => {
    const itemA = stockable(80_010, 40)
    const itemB = stockable(80_011, 40)
    const context = makeContext({ c: [], d: [] }, ["c", "d"])
    context.consumableStock = new Map([
      [80_010, new Map([["c", 60]])],
      [80_011, new Map([["c", 50]])],
    ])
    const found = computeAllRuleAffectedItems(
      compile([stockRule(100, true), SELL_RULE]),
      [itemA, itemB],
      context
    )
    expect(charactersServed(found, "stock").every((one) => one === "d")).toBe(true)
    expect(unitsIn(found, "stock")).toBe(80)
    expect(unitsIn(found, "sell")).toBe(0)
  })

  test("a character already over the target takes nothing and the surplus sells", () => {
    const itemA = stockable(80_020, 40)
    const itemB = stockable(80_021, 40)
    const context = makeContext({ c: [] }, ["c"])
    context.consumableStock = new Map([
      [80_020, new Map([["c", 60]])],
      [80_021, new Map([["c", 50]])],
    ])
    const found = computeAllRuleAffectedItems(
      compile([stockRule(100, true), SELL_RULE]),
      [itemA, itemB],
      context
    )
    expect(unitsIn(found, "stock")).toBe(0)
    expect(unitsIn(found, "sell")).toBe(80)
  })

  test("no character is served the same recipe twice over one run", () => {
    fc.assert(
      fc.property(
        fc.array(STACK_COUNT_ARB, { minLength: 1, maxLength: 5 }),
        ELIGIBLE_CHAR_COUNT_ARB,
        (stackCounts, eligibleCount) => {
          const items = stackCounts.map((stackCount, at) => {
            const base = recipeCI(stackCount)
            return { ...base, item: { ...base.item, itemId: 90_000 + at } }
          })
          const context = makeContext(charactersKnowing(eligibleCount, [28289]))
          const found = computeAllRuleAffectedItems(compile([USE_RULE]), items, context)
          const served = charactersServed(found, "use")
          expect(new Set(served).size).toBe(served.length)
        }
      )
    )
  })
})
