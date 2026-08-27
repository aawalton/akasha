import { describe, expect, it } from "bun:test"
import { ESO_ITEMTYPE_RECIPE } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
} from "@temper/game-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import { CharacterId } from "@temper/game-items-rules-core/use-destination-types"
import type { ManagementPlan } from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeInventory,
  makeItem,
  makeLocation,
} from "./inventory-management-plan.test-utils"

function countActsByLabel(plan: ManagementPlan, label: string): number {
  let count = 0
  for (const session of plan.sessions) {
    for (const venue of session.venues) {
      for (const group of venue.actionGroups) {
        if (group.label !== label) continue
        for (const item of group.items) count += item.stackCount
      }
    }
  }
  return count
}

describe("buildManagementPlan – surplus fall-through (matcher-shape input)", () => {
  it("stack of 5 unknown recipes + 3 eligible chars + sell next → 3 use rows + 2 sell rows", () => {
    const charA = "1001"
    const charB = "1002"
    const charC = "1003"

    const recipeItem = makeItem("Recipe: Roast Venison")
    recipeItem.itemId = 99001
    recipeItem.itemType = ESO_ITEMTYPE_RECIPE
    recipeItem.stackCount = 5

    const useEntry: AffectedItem = {
      item: recipeItem,
      locationKey: "Bank",
      locationDisplayName: "Bank",
      bagId: 2,
      alreadyAtDestination: false,
      quantity: 3,
      useAllocation: [CharacterId(charA), CharacterId(charB), CharacterId(charC)],
    }
    const sellEntry: AffectedItem = {
      item: recipeItem,
      locationKey: "Bank",
      locationDisplayName: "Bank",
      bagId: 2,
      alreadyAtDestination: false,
      quantity: 2,
    }

    const useRule: CategoryRule = {
      id: "use",
      categoryId: ALL_CATEGORIES_ID,
      action: "use",
      destination: "character:by-priority",
      active: true,
    }
    const sellRule: CategoryRule = {
      id: "sell-rest",
      categoryId: ALL_CATEGORIES_ID,
      action: "sell",
      active: true,
    }

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charC]: makeLocation("Cassia", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem } }),
      },
      {
        [charA]: { displayName: "Azara" },
        [charB]: { displayName: "Bastian" },
        [charC]: { displayName: "Cassia" },
      }
    )

    const context: RuleMatcherContext = {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map([
        [charA, new Set<number>()],
        [charB, new Set<number>()],
        [charC, new Set<number>()],
      ]),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA, charB, charC],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const affectedItemsMap = new Map([
      ["use", [useEntry]],
      ["sell-rest", [sellEntry]],
    ])

    const plan = buildManagementPlan(
      [useRule, sellRule].map(compileCategoryRuleToOrdered),
      [],
      affectedItemsMap,
      inventory,
      context
    )

    expect(countActsByLabel(plan, "Use")).toBe(3)
    expect(countActsByLabel(plan, "Sell")).toBe(2)

    const charsWithUse = new Set<string>()
    for (const session of plan.sessions) {
      const hasUse = session.venues.some((v) =>
        v.actionGroups.some((g) => g.label === "Use" && g.items.length > 0)
      )
      if (hasUse) charsWithUse.add(session.characterId)
    }
    expect(charsWithUse).toEqual(new Set([charA, charB, charC]))

    const totalSellUnits = countActsByLabel(plan, "Sell")
    const totalUseUnits = countActsByLabel(plan, "Use")
    expect(totalSellUnits + totalUseUnits).toBe(5)
  })
})
