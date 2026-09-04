import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import type { RuleMatcherContext } from "../rule-matcher-context-types/rule-matcher-context-types.module.code.ts"

export function makeItem(overrides: Partial<InventoryItemData> = {}): InventoryItemData {
  return {
    itemId: 1,
    itemName: "Test Item",
    itemLink: "",
    quality: 2,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 1,
    ...overrides,
  }
}

export function makeContext(
  knownByChar: Record<string, number[]>,
  priority?: readonly string[]
): RuleMatcherContext {
  const knownRecipesByCharacter = new Map<string, Set<number>>()
  for (const [charId, itemIds] of Object.entries(knownByChar)) {
    knownRecipesByCharacter.set(charId, new Set(itemIds))
  }
  return {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: new Map(),
    consumableStock: new Map(),
    bankStock: new Map(),
    characterLevels: new Map(),
    knownRecipesByCharacter,
    knownMotifsByCharacter: new Map(),
    knownMotifsByStyleIdByCharacter: new Map(),
    knownScriptsByCharacter: new Map(),
    researchedTraitsByCharacter: new Map(),
    characterPriority: priority ?? Object.keys(knownByChar),
    craftingLevels: new Map(),
    openCooldowns: new Map(),
    transmuteCrystalCap: undefined,
    transmuteCrystalAmount: undefined,
    getCharacterSkillLineRanks: undefined,
  }
}
