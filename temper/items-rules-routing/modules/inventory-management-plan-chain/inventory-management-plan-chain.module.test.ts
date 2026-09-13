import { describe, expect, test } from "bun:test"
import { compileCategoryRuleToOrdered } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler/inventory-rule-compiler.module.code.ts"
import type { AffectedItem } from "akasha/temper/items-rules-core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { buildManagementPlan } from "akasha/temper/items-rules-routing/modules/inventory-management-plan/inventory-management-plan.module.code.ts"
import {
  BOUNDED_CHAIN_ARB,
  buildChainScenario,
  buildEquivalentMultiRuleScenario,
  CHAIN_ARB,
  type DestinationChain,
  dedupePriorityIds,
  PRIORITY_ARB,
  STOCK_STACK_COUNT_ARB,
  sumPlanByDestination,
  TARGET_QUANTITY_ARB,
  TIER_DESTINATION_ARB,
} from "akasha/temper/items-rules-routing/modules/inventory-management-plan-chain-property-fixtures/inventory-management-plan-chain-property-fixtures.module.code.ts"
import { sumPlanStackCount } from "akasha/temper/items-rules-routing/modules/inventory-management-plan-property-fixtures/inventory-management-plan-property-fixtures.module.code.ts"
import fc from "fast-check"

function planned(rules: readonly CategoryRule[], built: ReturnType<typeof buildChainScenario>) {
  return buildManagementPlan(
    rules.map(compileCategoryRuleToOrdered),
    [],
    built.affectedItemsMap,
    built.inventory,
    built.context
  )
}

function everyoneCanLevel(priorityIds: readonly string[]): ReadonlyMap<string, boolean> {
  return new Map(priorityIds.map((id) => [id, true] as const))
}

describe("The items one tier leaves over are offered to the tier below.", () => {
  test("a chain whose last tier is unbounded places the whole stack", () => {
    fc.assert(
      fc.property(
        STOCK_STACK_COUNT_ARB,
        CHAIN_ARB.filter((chain) => chain[chain.length - 1]?.targetQuantity === undefined),
        PRIORITY_ARB,
        (stockCount, generated, priorityNumbers) => {
          const priorityIds = dedupePriorityIds(priorityNumbers)
          const chain: DestinationChain = generated.map((tier) =>
            tier.charEligibility === undefined ? tier : { ...tier, charEligibility: undefined }
          )
          const built = buildChainScenario(
            stockCount,
            chain,
            priorityIds,
            everyoneCanLevel(priorityIds)
          )
          const plan = planned([built.stockRule, built.sellRule], built)
          expect(sumPlanStackCount(plan)).toBe(stockCount)
        }
      ),
      { numRuns: 40 }
    )
  })
})

describe("The items the last tier leaves over are threaded on to the next rule.", () => {
  test("a chain bounded at every tier still places the whole stack, the surplus selling", () => {
    fc.assert(
      fc.property(BOUNDED_CHAIN_ARB, fc.integer({ min: 1, max: 12 }), (chain, surplus) => {
        const targets = chain.reduce((sum, tier) => sum + (tier.targetQuantity ?? 0), 0)
        const stockCount = targets + surplus
        const priorityIds = ["1001", "1002"]
        const built = buildChainScenario(
          stockCount,
          chain,
          priorityIds,
          everyoneCanLevel(priorityIds)
        )
        expect(sumPlanStackCount(planned([built.stockRule, built.sellRule], built))).toBe(
          stockCount
        )
        expect(targets).toBeLessThanOrEqual(stockCount)
      }),
      { numRuns: 40 }
    )
  })

  test("a chain of tiers plans what one rule for each tier plans", () => {
    fc.assert(
      fc.property(
        STOCK_STACK_COUNT_ARB,
        fc.array(TARGET_QUANTITY_ARB, { minLength: 2, maxLength: 3 }),
        PRIORITY_ARB,
        (stockCount, targets, priorityNumbers) => {
          const priorityIds = dedupePriorityIds(priorityNumbers)
          const chain: DestinationChain = targets.map((targetQuantity) => ({
            destination: "bank" as const,
            targetQuantity,
          }))
          const built = buildChainScenario(
            stockCount,
            chain,
            priorityIds,
            everyoneCanLevel(priorityIds)
          )
          const chained = planned([built.stockRule, built.sellRule], built)
          const apart = buildEquivalentMultiRuleScenario(stockCount, chain, priorityIds)
          const separate = buildManagementPlan(
            apart.rules.map(compileCategoryRuleToOrdered),
            [],
            apart.affectedItemsMap,
            apart.inventory,
            apart.context
          )
          expect(Object.fromEntries(sumPlanByDestination(chained))).toEqual(
            Object.fromEntries(sumPlanByDestination(separate))
          )
          expect(sumPlanStackCount(chained)).toBe(sumPlanStackCount(separate))
        }
      ),
      { numRuns: 30 }
    )
  })
})

describe("A tier takes up to the count the tier names.", () => {
  test("a chain of one tier plans what the same destination and count plan without a chain", () => {
    fc.assert(
      fc.property(
        STOCK_STACK_COUNT_ARB,
        TARGET_QUANTITY_ARB,
        TIER_DESTINATION_ARB,
        PRIORITY_ARB,
        (stockCount, targetQuantity, destination, priorityNumbers) => {
          const priorityIds = dedupePriorityIds(priorityNumbers)
          const built = buildChainScenario(
            stockCount,
            [{ destination, targetQuantity }],
            priorityIds,
            everyoneCanLevel(priorityIds)
          )
          const chained = planned([built.stockRule, built.sellRule], built)
          const plain: CategoryRule = {
            id: "stock",
            categoryId: "all",
            action: "stock",
            destination,
            stockScope: "any-character",
            conditions: { targetQuantity },
            active: true,
          }
          const apart: Map<string, AffectedItem[]> = new Map([
            ["stock", built.affectedItemsMap.get("stock") ?? []],
            ["sell", []],
          ])
          const unchained = buildManagementPlan(
            [plain, built.sellRule].map(compileCategoryRuleToOrdered),
            [],
            apart,
            built.inventory,
            built.context
          )
          expect(sumPlanStackCount(chained)).toBe(sumPlanStackCount(unchained))
          expect(Object.fromEntries(sumPlanByDestination(chained))).toEqual(
            Object.fromEntries(sumPlanByDestination(unchained))
          )
        }
      ),
      { numRuns: 30 }
    )
  })
})

describe("A tier a character is not eligible for gives that character nothing.", () => {
  test("an ineligible character takes none of the first tier and the rest threads down", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 4, max: 24 }),
        TARGET_QUANTITY_ARB,
        fc.dictionary(fc.constantFrom("1001", "1002", "1003"), fc.boolean(), { minKeys: 2 }),
        (stockCount, targetQuantity, canLevel) => {
          const priorityIds = Object.keys(canLevel).sort()
          const canLevelMap = new Map<string, boolean>(Object.entries(canLevel))
          const chain: DestinationChain = [
            {
              destination: "character:by-priority",
              targetQuantity,
              charEligibility: { canLevelMorphs: { mode: "can-level" } },
            },
            { destination: "bank" },
          ]
          const built = buildChainScenario(stockCount, chain, priorityIds, canLevelMap)
          const plan = planned([built.stockRule, built.sellRule], built)
          const byVenue = sumPlanByDestination(plan)
          const eligible = priorityIds.filter((id) => canLevelMap.get(id) === true).length
          let toCharacters = 0
          for (const [at, id] of priorityIds.entries()) {
            const held = byVenue.get(`backpack:Char${String(at)}`) ?? 0
            if (canLevelMap.get(id) !== true) expect(held).toBe(0)
            toCharacters += held
          }
          expect(toCharacters).toBeLessThanOrEqual(eligible * targetQuantity)
          expect(sumPlanStackCount(plan)).toBe(stockCount)
        }
      ),
      { numRuns: 40 }
    )
  })
})
