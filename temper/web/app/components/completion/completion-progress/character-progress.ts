import type { BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import type { CharacterSkillMorphProgress } from "@temper/game-characters-skills-morphs-core/morph-progress-types"
import type { CharacterAchievementProgressResult } from "@temper/player-completion/completion-achievement-progress"
import { transformCharacterAchievementProgress } from "@temper/player-completion/completion-achievement-progress"
import { transformCadwellProgress } from "@temper/player-completion/completion-cadwell-progress"
import { transformDailyWritsProgress } from "@temper/player-completion/completion-daily-writs-progress"
import { transformLoreLibraryProgress } from "@temper/player-completion/completion-lore-library-progress"
import { transformPoiProgress } from "@temper/player-completion/completion-poi-progress"
import { transformQuestProgress } from "@temper/player-completion/completion-quest-progress"
import { transformSkillPointsProgress } from "@temper/player-completion/completion-skill-points-progress"
import { buildCharacterSummary } from "@temper/player-completion/completion-summary"
import { transformCompletionCharacters } from "@temper/player-completion/completion-transforms"
import type {
  AccountLoreProgress,
  CharacterCadwellProgress,
  CharacterCompanionRapportProgress,
  CharacterDailyWritsProgress,
  CharacterLoreLibraryProgress,
  CharacterMountTrainingProgress,
  CharacterPackUpgradesProgress,
  CharacterPoiProgress,
  CharacterQuestProgress,
  CharacterRecipeProgress,
  CharacterScribingProgress,
  CharacterSkillLineProgress,
  CharacterSkillPointsProgress,
  CharacterTraitResearchProgress,
  CharacterZoneCompletionProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { transformZoneCompletionProgress } from "@temper/player-completion/completion-zone-progress"
import type { useAccountCompletion, useCompletionCharacters } from "@temper/player-completion-ui/use-completion"
import { useMemo } from "react"
import type { CharacterSummaryData } from "@temper/player-completion/completion-card-registry"

export interface CharacterProgressData {
  rosterSize: number
  measuredCharacterCount: number
  characters: readonly CompletionCharacter[]
  characterAchievementProgress: readonly CharacterAchievementProgressResult[]
  cadwellProgress: readonly CharacterCadwellProgress[]
  progress: readonly CharacterSkillLineProgress[]
  morphProgress: readonly CharacterSkillMorphProgress[]
  mountTrainingProgress: readonly CharacterMountTrainingProgress[]
  packUpgradesProgress: readonly CharacterPackUpgradesProgress[]
  recipeProgress: readonly CharacterRecipeProgress[]
  scribingProgress: readonly CharacterScribingProgress[]
  skillPointsProgress: readonly CharacterSkillPointsProgress[]
  traitResearchProgress: readonly CharacterTraitResearchProgress[]
  questProgress: readonly CharacterQuestProgress[]
  companionQuestProgress: readonly CharacterQuestProgress[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
  loreLibraryProgress: readonly CharacterLoreLibraryProgress[]
  dailyWritsProgress: readonly CharacterDailyWritsProgress[]
  poiProgress: readonly CharacterPoiProgress[]
  zoneProgress: readonly CharacterZoneCompletionProgress[]
}

interface UseCharacterProgressArgs {
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  accountCompletion: ReturnType<typeof useAccountCompletion>["account"]
  companionQuestProgress: readonly CharacterQuestProgress[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
}

export interface UseCharacterProgressResult {
  characterProgress: CharacterProgressData
  characterSummary: CharacterSummaryData
  characterItems: readonly BadgeToggleGroupItem[]
  loreProgress: AccountLoreProgress
}

export function useCharacterProgress({
  rows,
  accountCompletion,
  companionQuestProgress,
  companionRapportProgress,
}: UseCharacterProgressArgs): UseCharacterProgressResult {
  const accountCollectibles = accountCompletion?.collectibles
  const {
    characters,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    traitResearchProgress,
    loreProgress,
    rosterSize,
    measuredCharacterCount,
  } = useMemo(
    () => transformCompletionCharacters(rows, accountCollectibles),
    [rows, accountCollectibles]
  )
  const characterAchievementProgress = useMemo(
    () => transformCharacterAchievementProgress(rows),
    [rows]
  )
  const cadwellProgress = useMemo(() => transformCadwellProgress(rows), [rows])
  const loreLibraryProgress = useMemo(() => transformLoreLibraryProgress(rows), [rows])
  const questProgress = useMemo(() => transformQuestProgress(rows), [rows])
  const skillPointsProgress = useMemo(() => transformSkillPointsProgress(rows), [rows])
  const poiProgress = useMemo(() => transformPoiProgress(rows), [rows])
  const zoneProgress = useMemo(() => transformZoneCompletionProgress(rows), [rows])
  const dailyWritsProgress = useMemo(() => transformDailyWritsProgress(rows), [rows])
  const characterSummary = useMemo(
    () =>
      buildCharacterSummary({
        characters,
        characterAchievementProgress,
        cadwellProgress,
        progress,
        morphProgress,
        mountTrainingProgress,
        packUpgradesProgress,
        recipeProgress,
        scribingProgress,
        skillPointsProgress,
        traitResearchProgress,
        questProgress,
        poiProgress,
        zoneProgress,
        companionQuestProgress,
        companionRapportProgress,
        loreLibraryProgress,
        dailyWritsProgress,
      }),
    [
      characters,
      characterAchievementProgress,
      cadwellProgress,
      progress,
      morphProgress,
      mountTrainingProgress,
      packUpgradesProgress,
      recipeProgress,
      scribingProgress,
      skillPointsProgress,
      traitResearchProgress,
      questProgress,
      poiProgress,
      zoneProgress,
      companionQuestProgress,
      companionRapportProgress,
      loreLibraryProgress,
      dailyWritsProgress,
    ]
  )
  const characterItems: BadgeToggleGroupItem[] = useMemo(
    () =>
      characters
        .map((c) => ({ value: c.id, label: c.name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [characters]
  )

  const characterProgress: CharacterProgressData = {
    rosterSize,
    measuredCharacterCount,
    characters,
    characterAchievementProgress,
    cadwellProgress,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    skillPointsProgress,
    traitResearchProgress,
    questProgress,
    companionQuestProgress,
    companionRapportProgress,
    dailyWritsProgress,
    loreLibraryProgress,
    poiProgress,
    zoneProgress,
  }

  return { characterProgress, characterSummary, characterItems, loreProgress }
}
