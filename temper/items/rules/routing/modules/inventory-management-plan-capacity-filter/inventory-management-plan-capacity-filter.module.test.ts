import { describe, expect, test } from "bun:test"
import { holdKeyedTitlesFromCheckout } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.test-fixtures.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { buildManagementPlan } from "akasha/temper/items/rules/routing/modules/inventory-management-plan/inventory-management-plan.module.code.ts"
import { applyDestinationCapacityFilter } from "akasha/temper/items/rules/routing/modules/inventory-management-plan-capacity-filter/inventory-management-plan-capacity-filter.module.code.ts"
import {
  BANK_FREE_ARB,
  buildCapacityBoundedScenario,
  buildStackableBypassScenario,
  CAPACITY_BOUNDED_ACTIONS,
  EQUIP_SPEC_LIST_ARB,
  ordered,
  STACK_COUNT_ARB,
  sumPlanStackCount,
} from "akasha/temper/items/rules/routing/test-fixtures/inventory-management-plan-property-fixtures/inventory-management-plan-property-fixtures.test-fixture.code.ts"
import {
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "akasha/temper/items/rules/routing/test-fixtures/inventory-management-plan-test-utils/inventory-management-plan-test-utils.test-fixture.code.ts"
import fc from "fast-check"

holdKeyedTitlesFromCheckout(temperVenue.slug)

describe("An item dropped for want of room is recorded against the rule sending the item.", () => {
  test("a move-to rule plans as many as the bank has room for and no more", () => {
    fc.assert(
      fc.property(EQUIP_SPEC_LIST_ARB, BANK_FREE_ARB, (equipSpecs, bankFree) => {
        const built = buildCapacityBoundedScenario("r1", "move-to", equipSpecs, bankFree)
        const kept = applyDestinationCapacityFilter(
          ordered(built.rule),
          [],
          built.affectedItemsMap,
          built.inventory
        )
        const plan = buildManagementPlan(ordered(built.rule), [], kept, built.inventory)
        const fits = Math.min(equipSpecs.length, bankFree)
        expect(sumPlanStackCount(plan)).toBe(fits)
        expect(plan.totalSlots).toBe(fits)
      })
    )
  })

  test("what the filter keeps and what it drops add back up to what it was given", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...CAPACITY_BOUNDED_ACTIONS),
        EQUIP_SPEC_LIST_ARB,
        BANK_FREE_ARB,
        (action, equipSpecs, bankFree) => {
          const built = buildCapacityBoundedScenario("r1", action, equipSpecs, bankFree)
          const kept = applyDestinationCapacityFilter(
            ordered(built.rule),
            [],
            built.affectedItemsMap,
            built.inventory
          )
          const actionable = (kept.get("r1") ?? []).filter((one) => !one.alreadyAtDestination)
          expect(actionable).toHaveLength(Math.min(equipSpecs.length, bankFree))
        }
      )
    )
  })
})

describe("A slot an item leaves on the plan is room for an item the plan stores there.", () => {
  test("a full chest takes a deposit once the plan sells what fills it", () => {
    const chest = "HouseBank:5462:4673"
    const tapestry = makeItem("Alinor Tapestry, Alinor Dawn")
    const banner = makeItem("Alliance War Banner")
    const inventory = makeInventory({
      [chest]: makeLocation("Alliance War", { 10: { 0: tapestry } }, { 10: 1 }),
      Bank: makeLocation("Bank", { 2: { 0: banner } }, { 2: 10 }),
    })
    const sell = makeRule("sell-furnishings", "sell")
    const store = makeRule("store-alliance-war", "move-to", "house-storage:Alliance War")
    const affected = new Map([
      [sell.id, [makeAffected(tapestry, chest, "Alliance War", 10)]],
      [store.id, [makeAffected(banner, "Bank", "Bank", 2)]],
    ])
    const rules = [...ordered(sell), ...ordered(store)]
    const kept = applyDestinationCapacityFilter(rules, [], affected, inventory)
    expect(kept.get(store.id)).toHaveLength(1)
  })
})

describe("An item joining a stack already at the destination takes no slot.", () => {
  test("a stackable the bank already holds moves however little room the bank has", () => {
    fc.assert(
      fc.property(fc.array(STACK_COUNT_ARB, { minLength: 1, maxLength: 12 }), (stackCounts) => {
        const built = buildStackableBypassScenario("r1", "move-to", stackCounts)
        const kept = applyDestinationCapacityFilter(
          ordered(built.rule),
          [],
          built.affectedItemsMap,
          built.inventory
        )
        const plan = buildManagementPlan(ordered(built.rule), [], kept, built.inventory)
        expect(sumPlanStackCount(plan)).toBe(stackCounts.reduce((sum, one) => sum + one, 0))
      })
    )
  })
})
