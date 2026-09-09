import type { BadgeToggleGroupItem } from "akasha/design/badges/badge-toggle-group/badge-toggle-group.module.code.tsx"
import type { CharacterSkillMorphProgress } from "akasha/temper/skill-morphs/morph-progress-types/morph-progress-types.module.code.ts"
import type {
  AchievementTallyCategory,
  CharacterAchievementProgressResult,
} from "akasha/temper/temper-player-completion/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import {
  achievementTally,
  transformCharacterAchievementProgress,
} from "akasha/temper/temper-player-completion/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import { transformCadwellProgress } from "akasha/temper/temper-player-completion/completion-cadwell-progress/completion-cadwell-progress.module.code.ts"
import type { CharacterSummaryData } from "akasha/temper/temper-player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import { transformDailyWritsProgress } from "akasha/temper/temper-player-completion/completion-daily-writs-progress/completion-daily-writs-progress.module.code.ts"
import { transformLoreLibraryProgress } from "akasha/temper/temper-player-completion/completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import { transformPoiProgress } from "akasha/temper/temper-player-completion/completion-poi-progress/completion-poi-progress.module.code.ts"
import { transformQuestProgress } from "akasha/temper/temper-player-completion/completion-quest-progress/completion-quest-progress.module.code.ts"
import { transformSkillPointsProgress } from "akasha/temper/temper-player-completion/completion-skill-points-progress/completion-skill-points-progress.module.code.ts"
import { buildCharacterSummary } from "akasha/temper/temper-player-completion/completion-summary/completion-summary.module.code.ts"
import { transformCompletionCharacters } from "akasha/temper/temper-player-completion/completion-transforms/completion-transforms.module.code.ts"
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
} from "akasha/temper/temper-player-completion/completion-ui-types/completion-ui-types.module.code.ts"
import { transformZoneCompletionProgress } from "akasha/temper/temper-player-completion/completion-zone-progress/completion-zone-progress.module.code.ts"
import type {
  useAccountCompletion,
  useCompletionCharacters,
} from "akasha/temper/temper-player-completion-ui/use-completion/use-completion.module.code.ts"
import { useMemo } from "react"
import type { CompletionCatalogs } from "../use-completion-catalogs/use-completion-catalogs.module.code.ts"

const CHARACTER_TALLY = "character"

export interface CharacterProgressData {
  rosterSize: number
  measuredCharacterCount: number
  characters: readonly CompletionCharacter[]
  characterAchievementProgress: readonly CharacterAchievementProgressResult[]
  characterAchievementTally: readonly AchievementTallyCategory[]
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
  catalogs: CompletionCatalogs
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
  catalogs,
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
    () =>
      transformCompletionCharacters(
        rows,
        catalogs.craftTypes,
        catalogs.researchLines,
        accountCollectibles
      ),
    [rows, catalogs.craftTypes, catalogs.researchLines, accountCollectibles]
  )
  const characterAchievementProgress = useMemo(
    () => transformCharacterAchievementProgress(rows, catalogs.achievementCategories),
    [rows, catalogs.achievementCategories]
  )
  const characterAchievementTally = useMemo(
    () => achievementTally(catalogs.achievementCategories, CHARACTER_TALLY),
    [catalogs.achievementCategories]
  )
  const cadwellProgress = useMemo(
    () => transformCadwellProgress(rows, catalogs.cadwellLevels),
    [rows, catalogs.cadwellLevels]
  )
  const loreLibraryProgress = useMemo(() => transformLoreLibraryProgress(rows), [rows])
  const questProgress = useMemo(
    () => transformQuestProgress(rows, catalogs.questZones),
    [rows, catalogs.questZones]
  )
  const skillPointsProgress = useMemo(() => transformSkillPointsProgress(rows), [rows])
  const poiProgress = useMemo(
    () => transformPoiProgress(rows, catalogs.poiZones),
    [rows, catalogs.poiZones]
  )
  const zoneProgress = useMemo(
    () => transformZoneCompletionProgress(rows, catalogs.zoneCompletionZones),
    [rows, catalogs.zoneCompletionZones]
  )
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
    characterAchievementTally,
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
