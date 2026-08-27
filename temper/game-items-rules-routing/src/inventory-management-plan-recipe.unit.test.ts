import { describe, expect, it } from "bun:test"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import type { CharacterSession } from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"

describe("buildManagementPlan – recipe use", () => {
  it("routes recipe use with by-priority to the character that doesn't know it", () => {
    const charA = "1001"
    const charB = "1002"

    const recipeItem = makeItem("Recipe: Roast Venison")
    recipeItem.itemId = 99001
    recipeItem.itemType = 29
    const RESULT_ID = 28289

    const rule = makeRule("r1", "use", "character:by-priority")
    const affected = makeAffected(recipeItem, "Bank", "Bank", 2)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem } }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const context: RuleMatcherContext = {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map([
        [charA, new Set([RESULT_ID])],
        [charB, new Set()],
      ]),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA, charB],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      context
    )
    expect(plan.sessions.length).toBeGreaterThanOrEqual(1)

    const charBSession = plan.sessions.find((s) => s.characterId === charB)
    if (charBSession === undefined) throw new Error("expected charBSession to be defined")
    const useVenue = charBSession.venues.find((v) =>
      v.actionGroups.some((g) => g.items.some((i) => i.action === "use"))
    )
    expect(useVenue).toBeDefined()
  })

  it("skips recipe when all characters with data already know it", () => {
    const charA = "1001"

    const recipeItem = makeItem("Recipe: Tarragon Chicken")
    recipeItem.itemId = 99002
    recipeItem.itemType = 29
    const RESULT_ID = 28301

    const rule = makeRule("r1", "use", "character:by-priority")
    const affected = makeAffected(recipeItem, "Bank", "Bank", 2)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Erin Solstice",
          { [ESO_BAG_BACKPACK]: {} },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem } }),
      },
      { [charA]: { displayName: "Erin Solstice" } }
    )

    const context: RuleMatcherContext = {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map([[charA, new Set([RESULT_ID])]]),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      context
    )
    expect(plan.sessions).toHaveLength(0)
    expect(plan.totalSlots).toBe(0)
  })

  it("skips characters without recipe data in by-priority resolution", () => {
    const charA = "1001"
    const charB = "1002"

    const recipeItem = makeItem("Recipe: Tarragon Chicken")
    recipeItem.itemId = 99002
    recipeItem.itemType = 29
    const RESULT_ID = 28301

    const rule = makeRule("r1", "use", "character:by-priority")
    const affected = makeAffected(recipeItem, "Bank", "Bank", 2)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Erin Solstice",
          { [ESO_BAG_BACKPACK]: {} },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [charB]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem } }),
      },
      { [charA]: { displayName: "Erin Solstice" }, [charB]: { displayName: "Azara" } }
    )

    const context: RuleMatcherContext = {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map([[charB, new Set([RESULT_ID])]]),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA, charB],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      context
    )
    expect(plan.sessions).toHaveLength(0)
    expect(plan.totalSlots).toBe(0)
  })
})

describe("buildManagementPlan – recipe use de-dup", () => {
  it("routes two copies of the same recipe to two different eligible characters", () => {
    const charA = "1001"
    const charB = "1002"

    const recipeItem1 = makeItem("Recipe: Roast Venison")
    recipeItem1.itemId = 99001
    recipeItem1.itemType = 29
    const recipeItem2 = makeItem("Recipe: Roast Venison")
    recipeItem2.itemId = 99002
    recipeItem2.itemType = 29
    const RESULT_ID = 28289

    const rule = makeRule("r1", "use", "character:by-priority")
    const affected1 = makeAffected(recipeItem1, "Bank", "Bank", 2)
    const affected2 = makeAffected(recipeItem2, "Bank", "Bank", 2)
    const map = new Map([["r1", [affected1, affected2]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem1, 1: recipeItem2 } }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
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
      ]),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA, charB],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      context
    )

    const charASession = plan.sessions.find((s) => s.characterId === charA)
    const charBSession = plan.sessions.find((s) => s.characterId === charB)
    if (charASession === undefined) throw new Error("expected charASession to be defined")
    if (charBSession === undefined) throw new Error("expected charBSession to be defined")

    function countUseItemsFor(session: CharacterSession): number {
      let count = 0
      for (const venue of session.venues) {
        for (const group of venue.actionGroups) {
          if (group.label !== "Use") continue
          for (const item of group.items) {
            if (item.action === "use") count++
          }
        }
      }
      return count
    }

    expect(countUseItemsFor(charASession)).toBe(1)
    expect(countUseItemsFor(charBSession)).toBe(1)
    expect(RESULT_ID).toBe(28289)
  })

  it("drops the second copy from r1's `use` when only one character is eligible", () => {
    const charA = "1001"
    const charB = "1002"

    const recipeItem1 = makeItem("Recipe: Roast Venison")
    recipeItem1.itemId = 99001
    recipeItem1.itemType = 29
    const recipeItem2 = makeItem("Recipe: Roast Venison")
    recipeItem2.itemId = 99002
    recipeItem2.itemType = 29
    const RESULT_ID = 28289

    const r1 = makeRule("r1", "use", "character:by-priority")
    const affected1 = makeAffected(recipeItem1, "Bank", "Bank", 2)
    const affected2 = makeAffected(recipeItem2, "Bank", "Bank", 2)
    const map = new Map([["r1", [affected1, affected2]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem1, 1: recipeItem2 } }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
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
        [charB, new Set<number>([RESULT_ID])],
      ]),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA, charB],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const plan = buildManagementPlan(
      [r1].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      context
    )

    let useCount = 0
    for (const session of plan.sessions) {
      for (const venue of session.venues) {
        for (const group of venue.actionGroups) {
          if (group.label !== "Use") continue
          for (const item of group.items) {
            if (item.action === "use") useCount++
          }
        }
      }
    }
    expect(useCount).toBe(1)

    const charASession = plan.sessions.find((s) => s.characterId === charA)
    if (charASession === undefined) throw new Error("expected charASession to be defined")
    const charBSession = plan.sessions.find((s) => s.characterId === charB)
    expect(charBSession).toBeUndefined()
  })

  it("does not de-dup across different ItemKey kinds — recipe claim does not block a motif", () => {
    const charA = "1001"

    const recipeItem = makeItem("Recipe: Roast Venison")
    recipeItem.itemId = 99001
    recipeItem.itemType = 29
    const RECIPE_RESULT_ID = 28289

    const motifItem = makeItem("Crafting Motif 15: Dwemer Boots")
    motifItem.itemId = 99002
    motifItem.itemType = 8
    motifItem.specializedItemType = 61

    const rule = makeRule("r1", "use", "character:by-priority")
    const affectedRecipe = makeAffected(recipeItem, "Bank", "Bank", 2)
    const affectedMotif = makeAffected(motifItem, "Bank", "Bank", 2)
    const map = new Map([["r1", [affectedRecipe, affectedMotif]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: recipeItem, 1: motifItem } }),
      },
      { [charA]: { displayName: "Azara" } }
    )

    const context: RuleMatcherContext = {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map([[charA, new Set<number>()]]),
      knownMotifsByCharacter: new Map([[charA, new Map<number, Set<number>>()]]),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [charA],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      context
    )

    const charASession = plan.sessions.find((s) => s.characterId === charA)
    if (charASession === undefined) throw new Error("expected charASession to be defined")

    const useItemIds = new Set<number>()
    for (const venue of charASession.venues) {
      for (const group of venue.actionGroups) {
        if (group.label !== "Use") continue
        for (const item of group.items) {
          if (item.action === "use") useItemIds.add(item.itemId)
        }
      }
    }
    expect(useItemIds.has(recipeItem.itemId)).toBe(true)
    expect(useItemIds.has(motifItem.itemId)).toBe(true)
    expect(RECIPE_RESULT_ID).toBe(28289)
  })
})
