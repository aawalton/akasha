import { describe, expect, it } from "bun:test"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeContext, makeItem } from "./inventory-rule-test-utils"
import type { RuleMatcherContext } from "./rule-matcher-context-types"

describe("itemPassesConditions — canResearch", () => {
  const CRAFTING_TYPE_BLACKSMITHING = 1
  const CRAFTING_TYPE_CLOTHIER = 2
  const CRAFTING_TYPE_WOODWORKING = 6
  const CRAFTING_TYPE_JEWELRYCRAFTING = 7

  function makeHeavyArmorItem(overrides: Partial<InventoryItemData> = {}): InventoryItemData {
    return makeItem({
      equipType: 3,
      traitType: 19,
      armorType: 3,
      weaponType: 0,
      ...overrides,
    })
  }

  function makeResearchContext(
    charId: string,
    craftingType: number,
    traitName: string,
    known: boolean
  ): RuleMatcherContext {
    const traitMap = new Map<string, boolean>([[traitName.toLowerCase(), known]])
    const craftMap = new Map<number, Map<string, boolean>>([[craftingType, traitMap]])
    return {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map(),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map([[charId, craftMap]]),
      characterPriority: [charId],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }
  }

  it("passes through without context", () => {
    const item = makeHeavyArmorItem()
    expect(itemPassesConditions(item, { canResearch: "can-research" })).toBe(true)
    expect(itemPassesConditions(item, { canResearch: "cannot-research" })).toBe(true)
  })

  it("passes through with empty researchedTraitsByCharacter", () => {
    const item = makeHeavyArmorItem()
    const ctx = makeContext({})
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(true)
    expect(itemPassesConditions(item, { canResearch: "cannot-research" }, ctx)).toBe(true)
  })

  it("can-research matches heavy armor item when trait is not known by any character", () => {
    const item = makeHeavyArmorItem()
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_BLACKSMITHING, "Divines", false)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(true)
  })

  it("can-research rejects heavy armor item when trait is known by all characters", () => {
    const item = makeHeavyArmorItem()
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_BLACKSMITHING, "Divines", true)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(false)
  })

  it("cannot-research rejects when trait is still unresearched by a character", () => {
    const item = makeHeavyArmorItem()
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_BLACKSMITHING, "Divines", false)
    expect(itemPassesConditions(item, { canResearch: "cannot-research" }, ctx)).toBe(false)
  })

  it("cannot-research passes when all characters have already researched it", () => {
    const item = makeHeavyArmorItem()
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_BLACKSMITHING, "Divines", true)
    expect(itemPassesConditions(item, { canResearch: "cannot-research" }, ctx)).toBe(true)
  })

  it("does not match heavy armor against clothier craft type", () => {
    const item = makeHeavyArmorItem()
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_CLOTHIER, "Divines", false)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(false)
  })

  it("matches light armor item against clothier craft type", () => {
    const item = makeItem({ equipType: 3, traitType: 19, armorType: 1, weaponType: 0 })
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_CLOTHIER, "Divines", false)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(true)
  })

  it("matches jewelry item against jewelry crafting type", () => {
    const item = makeItem({
      equipType: 2,
      traitType: 33,
      armorType: 0,
      weaponType: 0,
    })
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_JEWELRYCRAFTING, "Infused", false)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(true)
  })

  it("matches weapon against woodworking craft type for bows", () => {
    const item = makeItem({ equipType: 6, traitType: 2, armorType: 0, weaponType: 8 })
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_WOODWORKING, "Charged", false)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(true)
  })

  it("does not match weapon against wrong craft type", () => {
    const item = makeItem({ equipType: 6, traitType: 2, armorType: 0, weaponType: 8 })
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_BLACKSMITHING, "Charged", false)
    expect(itemPassesConditions(item, { canResearch: "can-research" }, ctx)).toBe(false)
  })

  it("correctly excludes companion-trait items from can-research (traitType outside 1-33)", () => {
    const companionItem = makeItem({ equipType: 1, traitType: 45, armorType: 3, weaponType: 0 })
    const ctx = makeResearchContext("char1", CRAFTING_TYPE_BLACKSMITHING, "Divines", false)
    expect(itemPassesConditions(companionItem, { canResearch: "can-research" }, ctx)).toBe(false)
    expect(itemPassesConditions(companionItem, { canResearch: "cannot-research" }, ctx)).toBe(true)
  })
})
