import { describe, expect, it } from "bun:test"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"
import fc from "fast-check"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  boundedChainArb,
  buildChainScenario,
  buildEquivalentMultiRuleScenario,
  chainArb,
  type DestinationChain,
  dedupePriorityIds,
  priorityArb,
  stockStackCountArb,
  sumPlanByDestination,
  targetQuantityArb,
  tierDestinationArb,
} from "./inventory-management-plan-chain-property-fixtures"
import { sumPlanStackCount } from "./inventory-management-plan-property-fixtures"

describe("buildManagementPlan — destinationChain sum invariant", () => {
  it("(a) unbounded-tail chain: sum(per-tier allocations) === stackCount", () => {
    fc.assert(
      fc.property(
        stockStackCountArb,
        chainArb.filter((chain) => {
          const tail = chain[chain.length - 1]
          return tail !== undefined && tail.targetQuantity === undefined
        }),
        priorityArb,
        (stockCount, generatedChain, priorityNums) => {
          const priorityIds = dedupePriorityIds(priorityNums)
          const chain: DestinationChain = generatedChain.map((tier) =>
            tier.charEligibility ? { ...tier, charEligibility: undefined } : tier
          )
          const canLevelMap = new Map(priorityIds.map((id) => [id, true] as const))
          const { stockRule, sellRule, affectedItemsMap, inventory, context } = buildChainScenario(
            stockCount,
            chain,
            priorityIds,
            canLevelMap
          )
          const plan = buildManagementPlan(
            [stockRule, sellRule].map(compileCategoryRuleToOrdered),
            [],
            affectedItemsMap,
            inventory,
            context
          )
          expect(sumPlanStackCount(plan)).toBe(stockCount)
        }
      ),
      { numRuns: 40 }
    )
  })
})

describe("buildManagementPlan — destinationChain bounded partial sum", () => {
  it("(b) every-tier-bounded chain caps total allocation at sum(targetQuantity)", () => {
    fc.assert(
      fc.property(boundedChainArb, fc.integer({ min: 1, max: 12 }), (chain, surplus) => {
        const totalTargets = chain.reduce((acc, tier) => acc + (tier.targetQuantity ?? 0), 0)
        const stockCount = totalTargets + surplus
        const priorityIds = ["1001", "1002"]
        const canLevelMap = new Map([
          ["1001", true],
          ["1002", true],
        ])
        const { stockRule, sellRule, affectedItemsMap, inventory, context } = buildChainScenario(
          stockCount,
          chain,
          priorityIds,
          canLevelMap
        )
        const plan = buildManagementPlan(
          [stockRule, sellRule].map(compileCategoryRuleToOrdered),
          [],
          affectedItemsMap,
          inventory,
          context
        )
        const chainPlanItems = sumPlanStackCount(plan)
        expect(chainPlanItems).toBe(stockCount)
        expect(totalTargets).toBeLessThanOrEqual(stockCount)
      }),
      { numRuns: 40 }
    )
  })
})

describe("buildManagementPlan — destinationChain 1-tier-equivalence", () => {
  it("(c) chain `[{ destination, targetQuantity }]` ≡ legacy { destination, targetQuantity }", () => {
    fc.assert(
      fc.property(
        stockStackCountArb,
        targetQuantityArb,
        tierDestinationArb,
        priorityArb,
        (stockCount, target, destination, priorityNums) => {
          const priorityIds = dedupePriorityIds(priorityNums)
          const canLevelMap = new Map(priorityIds.map((id) => [id, true] as const))

          const chain: DestinationChain = [{ destination, targetQuantity: target }]
          const chainScenario = buildChainScenario(stockCount, chain, priorityIds, canLevelMap)
          const chainPlan = buildManagementPlan(
            [chainScenario.stockRule, chainScenario.sellRule].map(compileCategoryRuleToOrdered),
            [],
            chainScenario.affectedItemsMap,
            chainScenario.inventory,
            chainScenario.context
          )

          const legacyStockRule: CategoryRule = {
            id: "stock",
            categoryId: "all",
            action: "stock",
            destination,
            stockScope: "any-character",
            conditions: { targetQuantity: target },
            active: true,
          }
          const legacySellRule: CategoryRule = {
            id: "sell",
            categoryId: "all",
            action: "sell",
            active: true,
          }
          const legacyAffected: Map<string, AffectedItem[]> = new Map([
            ["stock", chainScenario.affectedItemsMap.get("stock") ?? []],
            ["sell", []],
          ])
          const legacyPlan = buildManagementPlan(
            [legacyStockRule, legacySellRule].map(compileCategoryRuleToOrdered),
            [],
            legacyAffected,
            chainScenario.inventory,
            chainScenario.context
          )

          const chainSums = sumPlanByDestination(chainPlan)
          const legacySums = sumPlanByDestination(legacyPlan)
          expect(sumPlanStackCount(chainPlan)).toBe(sumPlanStackCount(legacyPlan))
          expect(Object.fromEntries(chainSums)).toEqual(Object.fromEntries(legacySums))
        }
      ),
      { numRuns: 30 }
    )
  })
})

describe("buildManagementPlan — destinationChain per-tier eligibility gate", () => {
  it("(d) tier-1 canLevelMorphs filter zeroes ineligible chars; share threads to tier 2", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 4, max: 24 }),
        targetQuantityArb,
        fc.dictionary(fc.constantFrom("1001", "1002", "1003"), fc.boolean(), {
          minKeys: 2,
        }),
        (stockCount, perCharTarget, canLevelDict) => {
          const priorityIds = Object.keys(canLevelDict).sort()
          const canLevelMap = new Map<string, boolean>(Object.entries(canLevelDict))

          const chain: DestinationChain = [
            {
              destination: "character:by-priority",
              targetQuantity: perCharTarget,
              charEligibility: { canLevelMorphs: { mode: "can-level" } },
            },
            { destination: "bank" },
          ]
          const { stockRule, sellRule, affectedItemsMap, inventory, context } = buildChainScenario(
            stockCount,
            chain,
            priorityIds,
            canLevelMap
          )
          const plan = buildManagementPlan(
            [stockRule, sellRule].map(compileCategoryRuleToOrdered),
            [],
            affectedItemsMap,
            inventory,
            context
          )

          const sums = sumPlanByDestination(plan)
          const eligibleCount = priorityIds.filter((id) => canLevelMap.get(id)).length
          const tierZeroAllocated = priorityIds.reduce((acc, id) => {
            const idx = priorityIds.indexOf(id)
            const venueKey = `backpack:Char${idx}`
            const v = sums.get(venueKey) ?? 0
            return acc + v
          }, 0)
          expect(tierZeroAllocated).toBeLessThanOrEqual(eligibleCount * perCharTarget)
          for (const id of priorityIds) {
            if (canLevelMap.get(id) === true) continue
            const idx = priorityIds.indexOf(id)
            const venueKey = `backpack:Char${idx}`
            expect(sums.get(venueKey) ?? 0).toBe(0)
          }
          expect(sumPlanStackCount(plan)).toBe(stockCount)
        }
      ),
      { numRuns: 40 }
    )
  })
})

describe("buildManagementPlan — destinationChain ≡ cross-rule residue", () => {
  it("(e) chain `[A, B, C]` per-destination totals match three rules `[A]`, `[B]`, `[C]`", () => {
    fc.assert(
      fc.property(
        stockStackCountArb,
        fc.array(targetQuantityArb, { minLength: 2, maxLength: 3 }),
        priorityArb,
        (stockCount, targets, priorityNums) => {
          const priorityIds = dedupePriorityIds(priorityNums)
          const chain: DestinationChain = targets.map((t) => ({
            destination: "bank" as const,
            targetQuantity: t,
          }))
          const canLevelMap = new Map(priorityIds.map((id) => [id, true] as const))

          const chainScenario = buildChainScenario(stockCount, chain, priorityIds, canLevelMap)
          const chainPlan = buildManagementPlan(
            [chainScenario.stockRule, chainScenario.sellRule].map(compileCategoryRuleToOrdered),
            [],
            chainScenario.affectedItemsMap,
            chainScenario.inventory,
            chainScenario.context
          )

          const multiScenario = buildEquivalentMultiRuleScenario(stockCount, chain, priorityIds)
          const multiPlan = buildManagementPlan(
            multiScenario.rules.map(compileCategoryRuleToOrdered),
            [],
            multiScenario.affectedItemsMap,
            multiScenario.inventory,
            multiScenario.context
          )

          expect(Object.fromEntries(sumPlanByDestination(chainPlan))).toEqual(
            Object.fromEntries(sumPlanByDestination(multiPlan))
          )
          expect(sumPlanStackCount(chainPlan)).toBe(sumPlanStackCount(multiPlan))
        }
      ),
      { numRuns: 30 }
    )
  })
})
