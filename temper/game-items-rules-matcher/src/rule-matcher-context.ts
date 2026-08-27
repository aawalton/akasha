import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import type {
  CharacterBuildInput,
  CompanionBuildInput,
  CompletionCharacterInput,
  CompletionCompanionInput,
  RuleMatcherContext,
} from "@temper/game-items-rules-core/rule-matcher-context-types"
import type { AutomationSettings } from "@temper/shared-engine/automation/automation-settings-types"
import {
  buildGetCharacterCanLevelMorphs,
  compileCharacterCanLevelMorphs,
} from "./rule-matcher-context-can-level-morphs"
import { buildGetCharacterCurseState, compileCurseStates } from "./rule-matcher-context-curse-state"
import {
  compileWantedCompanionEquipment,
  compileWantedEquipment,
} from "./rule-matcher-context-equipment"
import {
  compileBankStock,
  compileConsumableStock,
  compileKnownMotifs,
  compileKnownMotifsByStyleId,
  compileKnownRecipes,
  compileKnownScripts,
  compileResearchableTraits,
  compileWantedConsumables,
} from "./rule-matcher-context-knowledge"
import {
  buildGetCharacterSkillLineRanks,
  compileSkillLineCurrentRanks,
} from "./rule-matcher-context-skill-lines"


interface BuildDerivedContext {
  wantedEquipment: RuleMatcherContext["wantedEquipment"]
  wantedCompanionEquipment: RuleMatcherContext["wantedCompanionEquipment"]
  wantedConsumables: RuleMatcherContext["wantedConsumables"]
  characterLevels: RuleMatcherContext["characterLevels"]
  knownRecipesByCharacter: RuleMatcherContext["knownRecipesByCharacter"]
  knownMotifsByCharacter: RuleMatcherContext["knownMotifsByCharacter"]
  knownMotifsByStyleIdByCharacter: RuleMatcherContext["knownMotifsByStyleIdByCharacter"]
  knownScriptsByCharacter: RuleMatcherContext["knownScriptsByCharacter"]
  researchedTraitsByCharacter: RuleMatcherContext["researchedTraitsByCharacter"]
  characterPriority: RuleMatcherContext["characterPriority"]
  getCharacterSkillLineRanks: NonNullable<RuleMatcherContext["getCharacterSkillLineRanks"]>
  getCharacterCurseState: NonNullable<RuleMatcherContext["getCharacterCurseState"]>
  getCharacterCanLevelMorphs: NonNullable<RuleMatcherContext["getCharacterCanLevelMorphs"]>
}

export function buildDerivedContext(
  completionCharacters: readonly CompletionCharacterInput[],
  characterBuilds: readonly CharacterBuildInput[],
  completionCompanions: readonly CompletionCompanionInput[],
  companionBuilds: readonly CompanionBuildInput[],
  automationSettings?: AutomationSettings
): BuildDerivedContext {
  const buildById = new Map(characterBuilds.map((b) => [b.id, b]))
  const companionBuildById = new Map(companionBuilds.map((b) => [b.id, b]))

  const wantedEquipment = compileWantedEquipment(
    completionCharacters,
    buildById,
    automationSettings
  )
  const wantedCompanionEquipment = compileWantedCompanionEquipment(
    completionCompanions,
    companionBuildById,
    automationSettings
  )
  const wantedConsumables = compileWantedConsumables(
    completionCharacters,
    buildById,
    automationSettings
  )
  const characterLevels = new Map<string, number>()
  const knownRecipesByCharacter = compileKnownRecipes(completionCharacters)
  const knownMotifsByCharacter = compileKnownMotifs(completionCharacters)
  const knownMotifsByStyleIdByCharacter = compileKnownMotifsByStyleId(completionCharacters)
  const knownScriptsByCharacter = compileKnownScripts(completionCharacters)
  const researchedTraitsByCharacter = compileResearchableTraits(completionCharacters)
  const characterPriority = [...completionCharacters]
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
    .map((c) => c.esoCharacterId)
  const skillLineCurrentRanks = compileSkillLineCurrentRanks(completionCharacters)
  const getCharacterSkillLineRanks = buildGetCharacterSkillLineRanks(skillLineCurrentRanks)
  const curseStatesByCharacter = compileCurseStates(completionCharacters)
  const getCharacterCurseState = buildGetCharacterCurseState(curseStatesByCharacter)
  const canLevelByCharacter = compileCharacterCanLevelMorphs(completionCharacters)
  const getCharacterCanLevelMorphs = buildGetCharacterCanLevelMorphs(canLevelByCharacter)

  return {
    wantedEquipment,
    wantedCompanionEquipment,
    wantedConsumables,
    characterLevels,
    knownRecipesByCharacter,
    knownMotifsByCharacter,
    knownMotifsByStyleIdByCharacter,
    knownScriptsByCharacter,
    researchedTraitsByCharacter,
    characterPriority,
    getCharacterSkillLineRanks,
    getCharacterCurseState,
    getCharacterCanLevelMorphs,
  }
}

export function mergeInventoryContext(
  buildDerived: BuildDerivedContext,
  inventory: InventoryDatabase | null
): RuleMatcherContext {
  const consumableStock = compileConsumableStock(inventory, buildDerived.wantedConsumables)
  const bankStock = compileBankStock(inventory)

  const craftingLevels = new Map<string, Map<number, number>>()
  if (inventory?.craftingLevels) {
    for (const [charId, perChar] of Object.entries(inventory.craftingLevels)) {
      const inner = new Map<number, number>()
      for (const [craftKey, rank] of Object.entries(perChar)) {
        inner.set(Number(craftKey), rank)
      }
      craftingLevels.set(charId, inner)
    }
  }

  const openCooldowns = new Map<string, number>()
  if (inventory?.openCooldowns) {
    for (const [groupKey, expiresAt] of Object.entries(inventory.openCooldowns)) {
      openCooldowns.set(groupKey, expiresAt)
    }
  }

  return {
    ...buildDerived,
    consumableStock,
    bankStock,
    craftingLevels,
    openCooldowns,
    transmuteCrystalCap: inventory?.transmuteCrystalCap,
    transmuteCrystalAmount: inventory?.transmuteCrystalAmount,
  }
}

export function buildRuleMatcherContext(
  completionCharacters: readonly CompletionCharacterInput[],
  characterBuilds: readonly CharacterBuildInput[],
  completionCompanions: readonly CompletionCompanionInput[],
  companionBuilds: readonly CompanionBuildInput[],
  inventory: InventoryDatabase | null,
  automationSettings?: AutomationSettings
): RuleMatcherContext {
  const buildDerived = buildDerivedContext(
    completionCharacters,
    characterBuilds,
    completionCompanions,
    companionBuilds,
    automationSettings
  )
  return mergeInventoryContext(buildDerived, inventory)
}
