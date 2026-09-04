import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "../inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"

export interface RuleMatcherContext {
  wantedEquipment: readonly WantedEquipmentSignature[]
  wantedCompanionEquipment: readonly WantedCompanionEquipmentSignature[]
  wantedConsumables: Map<number, string[]>
  consumableStock: Map<number, Map<string, number>>
  bankStock: Map<number, number>
  characterLevels: Map<string, number>
  knownRecipesByCharacter: Map<string, Set<number>>
  knownMotifsByCharacter: Map<string, Map<number, Set<number>>>
  knownMotifsByStyleIdByCharacter: Map<string, Map<number, Set<number>>>
  knownScriptsByCharacter: Map<string, Set<number>>
  researchedTraitsByCharacter: Map<string, Map<number, Map<string, boolean>>>
  characterPriority: readonly string[]
  craftingLevels: Map<string, Map<number, number>>
  openCooldowns: Map<string, number>
  transmuteCrystalCap: number | undefined
  transmuteCrystalAmount: number | undefined
  getCharacterSkillLineRanks?: (
    this: void,
    charId: string,
    skillLineId: string
  ) => { currentRank: number; maxRank: number } | undefined
  getCharacterCurseState?: (this: void, charId: string) => "vampire" | "werewolf" | undefined
  getCharacterCanLevelMorphs?: (this: void, charId: string) => boolean
}

export interface CompletionCharacterInput {
  esoCharacterId: string
  targetBuildId: string | null | undefined
  sortOrder: number | null | undefined
  completion?: unknown
}

export interface CharacterBuildInput {
  id: string
  buildHash: string
  esoCharacterId: string | null | undefined
}

export interface CompletionCompanionInput {
  companionId: string
  targetBuildId: string | null | undefined
}

export interface CompanionBuildInput {
  id: string
  buildHash: string
}
