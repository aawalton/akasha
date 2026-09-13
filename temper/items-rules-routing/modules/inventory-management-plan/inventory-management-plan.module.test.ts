import { describe, expect, test } from "bun:test"
import { buildManagementPlan } from "akasha/temper/items-rules-routing/modules/inventory-management-plan/inventory-management-plan.module.code.ts"
import {
  buildRecipeDedupScenario,
  buildScenario,
  buildStockByPriorityScenario,
  COPY_COUNT_ARB,
  ITEM_SPEC_LIST_ARB,
  NON_PHYSICAL_ACTIONS,
  ordered,
  PHYSICAL_ACTIONS,
  PRIORITY_ARB,
  RECIPE_RESULT_ID,
  STOCK_STACK_COUNT_ARB,
  STOCK_TARGET_ARB,
  sumPlanStackCount,
} from "akasha/temper/items-rules-routing/test-fixtures/inventory-management-plan-property-fixtures/inventory-management-plan-property-fixtures.test-fixture.code.ts"
import fc from "fast-check"

function charactersFor(priorityNumbers: readonly number[]): readonly string[] {
  const named: string[] = []
  for (const one of priorityNumbers) {
    const id = `100${String(one)}`
    if (!named.includes(id)) named.push(id)
  }
  return named
}

describe("Every unit of a stack an actionable rule takes reaches the plan.", () => {
  test("selling or destroying plans as many units as the holdings carry", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PHYSICAL_ACTIONS), ITEM_SPEC_LIST_ARB, (action, specs) => {
        const built = buildScenario("r1", action, specs)
        const plan = buildManagementPlan(
          ordered(built.rule),
          [],
          built.affectedItemsMap,
          built.inventory
        )
        expect(sumPlanStackCount(plan)).toBe(specs.reduce((sum, one) => sum + one.stackCount, 0))
      })
    )
  })

  test("a plan's slots are the distinct items it moves rather than the units", () => {
    fc.assert(
      fc.property(ITEM_SPEC_LIST_ARB, (specs) => {
        const built = buildScenario("r1", "sell", specs)
        const plan = buildManagementPlan(
          ordered(built.rule),
          [],
          built.affectedItemsMap,
          built.inventory
        )
        expect(plan.totalSlots).toBe(specs.length)
      })
    )
  })
})

describe("A rule asking for no errand puts nothing in the plan.", () => {
  test("nothing, lock and unlock plan no session and no unit", () => {
    fc.assert(
      fc.property(fc.constantFrom(...NON_PHYSICAL_ACTIONS), ITEM_SPEC_LIST_ARB, (action, specs) => {
        const built = buildScenario("r1", action, specs)
        const plan = buildManagementPlan(
          ordered(built.rule),
          [],
          built.affectedItemsMap,
          built.inventory
        )
        expect(plan.sessions).toHaveLength(0)
        expect(sumPlanStackCount(plan)).toBe(0)
      })
    )
  })
})

describe("A stock rule gives each character its target and no more.", () => {
  test("what is allocated is the target for each character, capped by the stack", () => {
    fc.assert(
      fc.property(
        STOCK_STACK_COUNT_ARB,
        STOCK_TARGET_ARB,
        PRIORITY_ARB,
        (stockCount, target, priorityNumbers) => {
          const characters = charactersFor(priorityNumbers)
          const built = buildStockByPriorityScenario(stockCount, target, characters)
          buildManagementPlan(
            ordered(built.stockRule),
            [],
            built.affectedItemsMap,
            null,
            built.context
          )
          const allocation = (built.affectedItemsMap.get("stock") ?? [])[0]?.useAllocation ?? []
          const perCharacter = new Map<string, number>()
          for (const one of allocation) perCharacter.set(one, (perCharacter.get(one) ?? 0) + 1)
          for (const count of perCharacter.values()) expect(count).toBeLessThanOrEqual(target)
          expect(allocation).toHaveLength(Math.min(stockCount, characters.length * target))
        }
      ),
      { numRuns: 60 }
    )
  })
})

describe("No character is sent two copies of one recipe in a plan.", () => {
  test("a session holds at most one use of the recipe", () => {
    fc.assert(
      fc.property(COPY_COUNT_ARB, PRIORITY_ARB, (copyCount, priorityNumbers) => {
        const built = buildRecipeDedupScenario(copyCount, charactersFor(priorityNumbers))
        const plan = buildManagementPlan(
          ordered(built.rule),
          [],
          built.affectedItemsMap,
          built.inventory,
          built.context
        )
        for (const session of plan.sessions) {
          let used = 0
          for (const venue of session.venues) {
            for (const group of venue.actionGroups) {
              if (group.label !== "Use") continue
              for (const item of group.items) if (item.action === "use") used += 1
            }
          }
          expect(used).toBeLessThanOrEqual(1)
        }
        expect(RECIPE_RESULT_ID).toBe(28289)
      }),
      { numRuns: 50 }
    )
  })
})
