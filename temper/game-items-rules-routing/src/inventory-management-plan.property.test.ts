import { describe, expect, it } from "bun:test"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import fc from "fast-check"
import { buildManagementPlan } from "./inventory-management-plan"
import { applyDestinationCapacityFilter } from "./inventory-management-plan-capacity-filter"
import {
  bankFreeArb,
  buildCapacityBoundedScenario,
  buildRecipeDedupScenario,
  buildScenario,
  buildStackableBypassScenario,
  buildStockByPriorityScenario,
  CAPACITY_BOUNDED_ACTIONS,
  copyCountArb,
  equipSpecListArb,
  itemSpecListArb,
  NON_PHYSICAL_ACTIONS,
  PHYSICAL_ACTIONS,
  priorityArb,
  RECIPE_RESULT_ID,
  stackCountArb,
  stockStackCountArb,
  stockTargetArb,
  sumPlanStackCount,
} from "./inventory-management-plan-property-fixtures"

describe("buildManagementPlan — property invariants", () => {
  it("preserves stack-expanded item count for actionable rules (sell, destroy)", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PHYSICAL_ACTIONS), itemSpecListArb, (action, itemSpecs) => {
        const { rule, affectedItemsMap, inventory } = buildScenario("r1", action, itemSpecs)
        const plan = buildManagementPlan(
          [rule].map(compileCategoryRuleToOrdered),
          [],
          affectedItemsMap,
          inventory
        )
        const expectedUnits = itemSpecs.reduce((s, spec) => s + spec.stackCount, 0)
        expect(sumPlanStackCount(plan)).toBe(expectedUnits)
      })
    )
  })

  it("emits no plan items for non-physical actions (nothing, lock, unlock)", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...NON_PHYSICAL_ACTIONS),
        itemSpecListArb,
        (action, itemSpecs) => {
          const { rule, affectedItemsMap, inventory } = buildScenario("r1", action, itemSpecs)
          const plan = buildManagementPlan(
            [rule].map(compileCategoryRuleToOrdered),
            [],
            affectedItemsMap,
            inventory
          )
          expect(plan.sessions).toHaveLength(0)
          expect(sumPlanStackCount(plan)).toBe(0)
        }
      )
    )
  })

  it("plan totalSlots equals number of distinct affected items (sell)", () => {
    fc.assert(
      fc.property(itemSpecListArb, (itemSpecs) => {
        const { rule, affectedItemsMap, inventory } = buildScenario("r1", "sell", itemSpecs)
        const plan = buildManagementPlan(
          [rule].map(compileCategoryRuleToOrdered),
          [],
          affectedItemsMap,
          inventory
        )
        expect(plan.totalSlots).toBe(itemSpecs.length)
      })
    )
  })
})

describe("buildManagementPlan — capacity-bounded property invariants", () => {
  it("non-stackable units fit into plan up to bank free slots (move-to)", () => {
    fc.assert(
      fc.property(
        fc.constant("move-to" as const),
        equipSpecListArb,
        bankFreeArb,
        (action, equipSpecs, bankFree) => {
          const { rule, affectedItemsMap, inventory } = buildCapacityBoundedScenario(
            "r1",
            action,
            equipSpecs,
            bankFree
          )
          const filtered = applyDestinationCapacityFilter(
            [rule].map(compileCategoryRuleToOrdered),
            [],
            affectedItemsMap,
            inventory
          )
          const plan = buildManagementPlan(
            [rule].map(compileCategoryRuleToOrdered),
            [],
            filtered,
            inventory
          )
          const fits = Math.min(equipSpecs.length, bankFree)
          expect(sumPlanStackCount(plan)).toBe(fits)
          expect(plan.totalSlots).toBe(fits)
        }
      )
    )
  })

  it("capacity filter partition: fits + excess equals input (non-stackable)", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...CAPACITY_BOUNDED_ACTIONS),
        equipSpecListArb,
        bankFreeArb,
        (action, equipSpecs, bankFree) => {
          const { rule, affectedItemsMap, inventory } = buildCapacityBoundedScenario(
            "r1",
            action,
            equipSpecs,
            bankFree
          )
          const filtered = applyDestinationCapacityFilter(
            [rule].map(compileCategoryRuleToOrdered),
            [],
            affectedItemsMap,
            inventory
          )
          const filteredItems = filtered.get("r1") ?? []
          const actionable = filteredItems.filter((i) => !i.alreadyAtDestination)
          expect(actionable).toHaveLength(Math.min(equipSpecs.length, bankFree))
        }
      )
    )
  })

  it("stackable items already in bank bypass capacity regardless of bankFree (move-to)", () => {
    const stackCountsArb = fc.array(stackCountArb, { minLength: 1, maxLength: 12 })
    fc.assert(
      fc.property(fc.constant("move-to" as const), stackCountsArb, (action, stackCounts) => {
        const { rule, affectedItemsMap, inventory } = buildStackableBypassScenario(
          "r1",
          action,
          stackCounts
        )
        const filtered = applyDestinationCapacityFilter(
          [rule].map(compileCategoryRuleToOrdered),
          [],
          affectedItemsMap,
          inventory
        )
        const plan = buildManagementPlan(
          [rule].map(compileCategoryRuleToOrdered),
          [],
          filtered,
          inventory
        )
        const expectedUnits = stackCounts.reduce((s, n) => s + n, 0)
        expect(sumPlanStackCount(plan)).toBe(expectedUnits)
      })
    )
  })
})

describe("buildManagementPlan — stock × by-priority property", () => {
  it("per-unit allocation respects targetQuantity and surplus falls through", () => {
    fc.assert(
      fc.property(
        stockStackCountArb,
        stockTargetArb,
        priorityArb,
        (stockCount, target, priorityNums) => {
          const seen = new Set<string>()
          const priorityIds: string[] = []
          for (const n of priorityNums) {
            const id = `100${n}`
            if (!seen.has(id)) {
              seen.add(id)
              priorityIds.push(id)
            }
          }
          const { stockRule, affectedItemsMap, context } = buildStockByPriorityScenario(
            stockCount,
            target,
            priorityIds
          )
          buildManagementPlan(
            [stockRule].map(compileCategoryRuleToOrdered),
            [],
            affectedItemsMap,
            null,
            context
          )
          const entries = affectedItemsMap.get("stock") ?? []
          const allocation = entries[0]?.useAllocation ?? []
          const perChar = new Map<string, number>()
          for (const c of allocation) perChar.set(c, (perChar.get(c) ?? 0) + 1)
          for (const count of perChar.values()) {
            expect(count).toBeLessThanOrEqual(target)
          }
          const expectedTotal = Math.min(stockCount, priorityIds.length * target)
          expect(allocation.length).toBe(expectedTotal)
        }
      ),
      { numRuns: 60 }
    )
  })
})

describe("buildManagementPlan — recipe use de-dup property", () => {
  it("no character receives two routed copies of the same recipe in a single plan", () => {
    fc.assert(
      fc.property(copyCountArb, priorityArb, (copyCount, priorityNums) => {
        const seen = new Set<string>()
        const priorityIds: string[] = []
        for (const n of priorityNums) {
          const id = `100${n}`
          if (!seen.has(id)) {
            seen.add(id)
            priorityIds.push(id)
          }
        }

        const { rule, affectedItemsMap, inventory, context } = buildRecipeDedupScenario(
          copyCount,
          priorityIds
        )
        const plan = buildManagementPlan(
          [rule].map(compileCategoryRuleToOrdered),
          [],
          affectedItemsMap,
          inventory,
          context
        )

        for (const session of plan.sessions) {
          let recipeCount = 0
          for (const venue of session.venues) {
            for (const group of venue.actionGroups) {
              if (group.label !== "Use") continue
              for (const item of group.items) {
                if (item.action === "use") recipeCount++
              }
            }
          }
          expect(recipeCount).toBeLessThanOrEqual(1)
        }
        expect(RECIPE_RESULT_ID).toBe(28289)
      }),
      { numRuns: 50 }
    )
  })
})
