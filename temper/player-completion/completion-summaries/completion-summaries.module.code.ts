import type { AccountCompletion } from "akasha/temper/completion/completion-progress/completion-progress.module.code.ts"
import { transformPoiProgress } from "akasha/temper/player-completion/completion-poi-progress/completion-poi-progress.module.code.ts"
import {
  transformCompanionQuestProgress,
  transformQuestProgress,
} from "akasha/temper/player-completion/completion-quest-progress/completion-quest-progress.module.code.ts"
import { computeOverallCompletionScore } from "akasha/temper/player-completion/completion-scope-rollup/completion-scope-rollup.module.code.ts"
import { transformSkillPointsProgress } from "akasha/temper/player-completion/completion-skill-points-progress/completion-skill-points-progress.module.code.ts"
import { transformSubclassingSkillLineProgress } from "akasha/temper/player-completion/completion-subclassing-progress/completion-subclassing-progress.module.code.ts"
import { buildCharacterSummary } from "akasha/temper/player-completion/completion-summary/completion-summary.module.code.ts"
import { buildAccountSummary } from "akasha/temper/player-completion/completion-summary-account/completion-summary-account.module.code.ts"
import { buildCompanionSummary } from "akasha/temper/player-completion/completion-summary-companion/completion-summary-companion.module.code.ts"
import { transformCompletionCharacters } from "akasha/temper/player-completion/completion-transforms/completion-transforms.module.code.ts"
import { transformTributeProgress } from "akasha/temper/player-completion/completion-tribute-progress/completion-tribute-progress.module.code.ts"
import { transformZoneCompletionProgress } from "akasha/temper/player-completion/completion-zone-progress/completion-zone-progress.module.code.ts"
import {
  transformAccountRecipeUnion,
  transformAccountScribingUnion,
} from "akasha/temper/player-completion/modules/completion-account-recipe-scribing-union/completion-account-recipe-scribing-union.module.code.ts"
import { transformAccountTraitResearchUnion } from "akasha/temper/player-completion/modules/completion-account-trait-union/completion-account-trait-union.module.code.ts"
import {
  transformAccountQuestUnion,
  transformCompanionQuestUnion,
} from "akasha/temper/player-completion/modules/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import {
  transformAccountPoiUnion,
  transformAccountZoneCompletionUnion,
} from "akasha/temper/player-completion/modules/completion-account-zone-poi-union/completion-account-zone-poi-union.module.code.ts"
import {
  transformAccountAchievementProgress,
  transformCharacterAchievementProgress,
} from "akasha/temper/player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import { transformAntiquityLoreProgress } from "akasha/temper/player-completion/modules/completion-antiquity-lore-progress/completion-antiquity-lore-progress.module.code.ts"
import { transformCadwellProgress } from "akasha/temper/player-completion/modules/completion-cadwell-progress/completion-cadwell-progress.module.code.ts"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "akasha/temper/player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import type { CompletionCatalogs } from "akasha/temper/player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import type { CompletionCharacterRow } from "akasha/temper/player-completion/modules/completion-character-row/completion-character-row.module.code.ts"
import { transformCollectiblesProgress } from "akasha/temper/player-completion/modules/completion-collectibles-progress/completion-collectibles-progress.module.code.ts"
import {
  transformCharacterCompanionRapport,
  transformCompanionProgress,
} from "akasha/temper/player-completion/modules/completion-companion-progress/completion-companion-progress.module.code.ts"
import type { CompletionCompanionRow } from "akasha/temper/player-completion/modules/completion-companion-row/completion-companion-row.module.code.ts"
import { transformDailyWritsProgress } from "akasha/temper/player-completion/modules/completion-daily-writs-progress/completion-daily-writs-progress.module.code.ts"
import { transformItemSetProgress } from "akasha/temper/player-completion/modules/completion-item-set-progress/completion-item-set-progress.module.code.ts"
import { transformLoreLibraryProgress } from "akasha/temper/player-completion/modules/completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import { transformSubclassingSkillMorphProgress } from "akasha/temper/skill-morphs/subclassing-morph-progress/subclassing-morph-progress.module.code.ts"

export interface CompletionSummariesInput {
  readonly characterRows: readonly CompletionCharacterRow[]
  readonly companionRows: readonly CompletionCompanionRow[]
  readonly accountCompletion: AccountCompletion | null | undefined
  readonly catalogs: CompletionCatalogs
}

export interface CompletionSummaries {
  readonly accountSummary: AccountSummaryData
  readonly characterSummary: CharacterSummaryData
  readonly companionSummary: CompanionSummaryData
}

export function buildCompletionSummaries(input: CompletionSummariesInput): CompletionSummaries {
  const { characterRows, companionRows, accountCompletion, catalogs } = input
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
  } = transformCompletionCharacters(
    characterRows,
    catalogs.craftTypes,
    catalogs.researchLines,
    accountCollectibles
  )

  const characterAchievementProgress = transformCharacterAchievementProgress(
    characterRows,
    catalogs.achievementCategories
  )
  const cadwellProgress = transformCadwellProgress(characterRows, catalogs.cadwellLevels)
  const skillPointsProgress = transformSkillPointsProgress(characterRows)
  const questProgress = transformQuestProgress(characterRows, catalogs.questZones)
  const companionQuestProgress = transformCompanionQuestProgress(characterRows)
  const poiProgress = transformPoiProgress(characterRows, catalogs.poiZones)
  const zoneProgress = transformZoneCompletionProgress(characterRows, catalogs.zoneCompletionZones)
  const companionRapportProgress = transformCharacterCompanionRapport(
    characterRows.map((row) => ({ id: row.id, completion: row.completion ?? null }))
  )
  const loreLibraryProgress = transformLoreLibraryProgress(characterRows)
  const dailyWritsProgress = transformDailyWritsProgress(characterRows)

  const characterSummary = buildCharacterSummary({
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
  })

  const accountSummary = buildAccountSummary(
    transformAccountAchievementProgress(
      accountCompletion,
      characterRows,
      catalogs.achievementCategories
    ),
    accountCompletion?.championPointsEarned ?? 0,
    transformAntiquityLoreProgress(accountCompletion, catalogs.antiquityCategories),
    transformCollectiblesProgress(accountCompletion, catalogs.collectibleCategories),
    transformItemSetProgress(accountCompletion),
    loreProgress,
    transformAccountPoiUnion(poiProgress, catalogs.poiZones),
    transformAccountQuestUnion(questProgress),
    transformAccountRecipeUnion(recipeProgress),
    transformAccountScribingUnion(scribingProgress),
    transformAccountTraitResearchUnion(
      traitResearchProgress,
      catalogs.craftTypes,
      catalogs.researchLines
    ),
    transformTributeProgress(accountCompletion, catalogs.tributePatrons),
    transformAccountZoneCompletionUnion(zoneProgress),
    accountCompletion?.bankUpgrade ?? { current: 0, max: 0 },
    accountCompletion?.grandMasterStations,
    transformSubclassingSkillLineProgress(accountCompletion),
    transformSubclassingSkillMorphProgress({
      subclassingSkillLineProgress: accountCompletion?.subclassingSkillLineProgress,
    })
  )

  const { companionProgress, companionSkillLineProgress } = transformCompanionProgress(
    companionRows,
    characterRows.map((row) => ({ completion: row.completion ?? null }))
  )
  const companionSummary = buildCompanionSummary(
    companionProgress,
    companionSkillLineProgress,
    transformCompanionQuestUnion(companionQuestProgress)
  )

  return { accountSummary, characterSummary, companionSummary }
}

export function computeOverallCompletionScoreFromRows(input: CompletionSummariesInput): number {
  const { accountSummary, characterSummary, companionSummary } = buildCompletionSummaries(input)
  return computeOverallCompletionScore(accountSummary, characterSummary, companionSummary)
}
