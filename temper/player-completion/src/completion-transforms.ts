import {
  ESO_CLASS_ID_TO_CLASS_ID as esoClassIdToClassId,
  ESO_RACE_ID_TO_RACE_ID as esoRaceIdToRaceId,
} from "@akasha/temper-skill-morphs-access/eso-id-helpers"
import type { CharacterSkillMorphProgress } from "@akasha/temper-skill-morphs/morph-progress-types"
import { transformAccountLoreUnion } from "./completion-account-lore-union"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import { transformRecipeProgress } from "./completion-recipe-progress"
import { transformScribingProgress } from "./completion-scribing-progress"
import { transformSkillLineProgress } from "./completion-skill-line-progress"
import { transformTraitResearchProgress } from "./completion-trait-research-progress"
import type {
  AccountLoreProgress,
  CharacterMountTrainingProgress,
  CharacterPackUpgradesProgress,
  CharacterRecipeProgress,
  CharacterScribingProgress,
  CharacterSkillLineProgress,
  CharacterTraitResearchProgress,
  CompletionCharacter,
} from "./completion-ui-types"

const MAX_CHARACTER_LEVEL = 50
const MAX_ALLIANCE_RANK = 50

const BASE_BAG_SLOTS = 60
const SLOTS_PER_PACK_UPGRADE = 10
const MAX_PACK_UPGRADES = 8
const STORAGE_PET_BONUS = 5
const STORAGE_PET_COLLECTIBLE_IDS = [4739, 5851, 4731]

interface TransformResult {
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

export function transformCompletionCharacters(
  rows: readonly CompletionCharacterRow[],
  accountCollectibles?: readonly number[]
): TransformResult {
  const characters: CompletionCharacter[] = []
  const mountTrainingProgress: CharacterMountTrainingProgress[] = []
  const packUpgradesProgress: CharacterPackUpgradesProgress[] = []

  const accountCollectibleSet = new Set<number>()
  if (accountCollectibles) {
    if (Array.isArray(accountCollectibles)) {
      for (const id of accountCollectibles) {
        if (typeof id === "number") accountCollectibleSet.add(id)
      }
    } else if (typeof accountCollectibles === "object") {
      for (const id of Object.values(accountCollectibles)) {
        if (typeof id === "number") accountCollectibleSet.add(id)
      }
    }
  }
  let storagePetBonus = 0
  for (const petId of STORAGE_PET_COLLECTIBLE_IDS) {
    if (accountCollectibleSet.has(petId)) storagePetBonus += STORAGE_PET_BONUS
  }

  let measuredCharacterCount = 0

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue
    measuredCharacterCount++

    const classId = esoClassIdToClassId.get(completion.classId ?? 0) ?? "no-class"
    const raceId = esoRaceIdToRaceId.get(completion.raceId ?? 0) ?? "no-race"

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

    const mt = completion.mountTraining
    mountTrainingProgress.push({
      characterId: row.id,
      speed: mt?.speed ?? 0,
      maxSpeed: mt?.maxSpeed ?? 60,
      stamina: mt?.stamina ?? 0,
      maxStamina: mt?.maxStamina ?? 60,
      carryCapacity: mt?.carryCapacity ?? 0,
      maxCarryCapacity: mt?.maxCarryCapacity ?? 60,
    })

    const bagSize = completion.bagSize ?? BASE_BAG_SLOTS
    const mountCarry = mt?.carryCapacity ?? 0
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
  const recipeProgress = transformRecipeProgress(rows)
  const scribingProgress = transformScribingProgress(rows)
  const traitResearchProgress = transformTraitResearchProgress(rows)
  const loreProgress = transformAccountLoreUnion(rows)

  return {
    characters,
    progress,
    morphProgress,
    recipeProgress,
    scribingProgress,
    traitResearchProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    loreProgress,
    rosterSize: rows.length,
    measuredCharacterCount,
  }
}
