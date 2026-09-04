import type { CharacterSkillMorphProgress } from "@akasha/temper-skill-morphs/morph-progress-types"
import {
  ESO_CLASS_ID_TO_CLASS_ID,
  ESO_RACE_ID_TO_RACE_ID,
} from "@akasha/temper-skill-morphs-access/eso-id-helpers"
import { transformAccountLoreUnion } from "../completion-account-lore-union/completion-account-lore-union.module.code.ts"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import { transformRecipeProgress } from "../completion-recipe-progress/completion-recipe-progress.module.code.ts"
import { transformScribingProgress } from "../completion-scribing-progress/completion-scribing-progress.module.code.ts"
import { transformSkillLineProgress } from "../completion-skill-line-progress/completion-skill-line-progress.module.code.ts"
import {
  type TraitResearchCatalogCraftType,
  type TraitResearchCatalogLine,
  transformTraitResearchProgress,
} from "../completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import type {
  AccountLoreProgress,
  CharacterMountTrainingProgress,
  CharacterPackUpgradesProgress,
  CharacterRecipeProgress,
  CharacterScribingProgress,
  CharacterSkillLineProgress,
  CharacterTraitResearchProgress,
  CompletionCharacter,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

const MAX_CHARACTER_LEVEL = 50
const MAX_ALLIANCE_RANK = 50

const BASE_BAG_SLOTS = 60
const SLOTS_PER_PACK_UPGRADE = 10
const MAX_PACK_UPGRADES = 8
const STORAGE_PET_BONUS = 5
const STORAGE_PET_COLLECTIBLE_IDS = [4739, 5851, 4731]

export interface CompletionTransformResult {
  characters: readonly CompletionCharacter[]
  progress: readonly CharacterSkillLineProgress[]
  morphProgress: readonly CharacterSkillMorphProgress[]
  recipeProgress: readonly CharacterRecipeProgress[]
  scribingProgress: readonly CharacterScribingProgress[]
  traitResearchProgress: readonly CharacterTraitResearchProgress[]
  mountTrainingProgress: readonly CharacterMountTrainingProgress[]
  packUpgradesProgress: readonly CharacterPackUpgradesProgress[]
  loreProgress: AccountLoreProgress
  rosterSize: number
  measuredCharacterCount: number
}

function storagePetBonusFor(accountCollectibles: readonly number[] | undefined): number {
  const held = new Set<number>()
  if (accountCollectibles) {
    const ids = Array.isArray(accountCollectibles)
      ? accountCollectibles
      : typeof accountCollectibles === "object"
        ? Object.values(accountCollectibles)
        : []
    for (const id of ids) {
      if (typeof id === "number") held.add(id)
    }
  }
  let bonus = 0
  for (const petId of STORAGE_PET_COLLECTIBLE_IDS) {
    if (held.has(petId)) bonus += STORAGE_PET_BONUS
  }
  return bonus
}

export function transformCompletionCharacters(
  rows: readonly CompletionCharacterRow[],
  craftTypes: readonly TraitResearchCatalogCraftType[],
  researchLines: readonly TraitResearchCatalogLine[],
  accountCollectibles?: readonly number[]
): CompletionTransformResult {
  const characters: CompletionCharacter[] = []
  const mountTrainingProgress: CharacterMountTrainingProgress[] = []
  const packUpgradesProgress: CharacterPackUpgradesProgress[] = []

  const storagePetBonus = storagePetBonusFor(accountCollectibles)

  let measuredCharacterCount = 0

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue
    measuredCharacterCount++

    const classId = ESO_CLASS_ID_TO_CLASS_ID.get(completion.classId ?? 0) ?? "no-class"
    const raceId = ESO_RACE_ID_TO_RACE_ID.get(completion.raceId ?? 0) ?? "no-race"

    const measuredLevel = completion.level ?? null

    characters.push({
      id: row.id,
      name: row.title ?? row.esoCharacterId,
      classId,
      raceId,
      level: measuredLevel ?? 0,
      maxLevel: measuredLevel === null ? 0 : MAX_CHARACTER_LEVEL,
      allianceRank: completion.allianceRank ?? 0,
      maxAllianceRank: MAX_ALLIANCE_RANK,
    })

    const mountTraining = completion.mountTraining
    mountTrainingProgress.push({
      characterId: row.id,
      speed: mountTraining?.speed ?? 0,
      maxSpeed: mountTraining?.maxSpeed ?? 60,
      stamina: mountTraining?.stamina ?? 0,
      maxStamina: mountTraining?.maxStamina ?? 60,
      carryCapacity: mountTraining?.carryCapacity ?? 0,
      maxCarryCapacity: mountTraining?.maxCarryCapacity ?? 60,
    })

    const bagSize = completion.bagSize ?? BASE_BAG_SLOTS
    const mountCarry = mountTraining?.carryCapacity ?? 0
    const packUpgradeSlots = bagSize - BASE_BAG_SLOTS - mountCarry - storagePetBonus
    const packUpgrades = Math.max(
      0,
      Math.min(MAX_PACK_UPGRADES, Math.round(packUpgradeSlots / SLOTS_PER_PACK_UPGRADE))
    )
    packUpgradesProgress.push({
      characterId: row.id,
      packUpgrades,
      maxPackUpgrades: MAX_PACK_UPGRADES,
    })
  }

  const { progress, morphProgress } = transformSkillLineProgress(rows)

  return {
    characters,
    progress,
    morphProgress,
    recipeProgress: transformRecipeProgress(rows),
    scribingProgress: transformScribingProgress(rows),
    traitResearchProgress: transformTraitResearchProgress(rows, craftTypes, researchLines),
    mountTrainingProgress,
    packUpgradesProgress,
    loreProgress: transformAccountLoreUnion(rows),
    rosterSize: rows.length,
    measuredCharacterCount,
  }
}
