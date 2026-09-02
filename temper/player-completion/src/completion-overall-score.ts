import { transformSubclassingSkillMorphProgress } from "@akasha/temper-skill-morphs/subclassing-morph-progress"
import type {
  AccountCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import {
  transformAccountRecipeUnion,
  transformAccountScribingUnion,
} from "./completion-account-recipe-scribing-union"
import { transformAccountTraitResearchUnion } from "./completion-account-trait-union"
import {
  transformAccountQuestUnion,
  transformCompanionQuestUnion,
} from "./completion-account-union-progress"
import {
  transformAccountPoiUnion,
  transformAccountZoneCompletionUnion,
} from "./completion-account-zone-poi-union"
import {
  transformAccountAchievementProgress,
  transformCharacterAchievementProgress,
} from "./completion-achievement-progress"
import { transformAntiquityLoreProgress } from "./completion-antiquity-lore-progress"
import { transformCadwellProgress } from "./completion-cadwell-progress"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "./completion-card-registry"
import { CUMULATIVE_ACCOUNT_CARDS, CUMULATIVE_CHARACTER_CARDS } from "./completion-card-registry"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { transformCollectiblesProgress } from "./completion-collectibles-progress"
import {
  transformCharacterCompanionRapport,
  transformCompanionProgress,
} from "./completion-companion-progress"
import { transformDailyWritsProgress } from "./completion-daily-writs-progress"
import { transformItemSetProgress } from "./completion-item-set-progress"
import { transformLoreLibraryProgress } from "./completion-lore-library-progress"
import { transformPoiProgress } from "./completion-poi-progress"
import {
  transformCompanionQuestProgress,
  transformQuestProgress,
} from "./completion-quest-progress"
import { transformSkillPointsProgress } from "./completion-skill-points-progress"
import { transformSubclassingSkillLineProgress } from "./completion-subclassing-progress"
import { buildCharacterSummary } from "./completion-summary"
import { buildAccountSummary } from "./completion-summary-account"
import { buildCompanionSummary } from "./completion-summary-companion"
import { transformCompletionCharacters } from "./completion-transforms"
import { transformTributeProgress } from "./completion-tribute-progress"
import { transformZoneCompletionProgress } from "./completion-zone-progress"

export interface CompletionCompanionRow {
  readonly companionId: string
  readonly completion: CompanionCompletion | null
}

export interface CompletionSummaries {
  readonly accountSummary: AccountSummaryData
  readonly characterSummary: CharacterSummaryData
  readonly companionSummary: CompanionSummaryData
}

export function buildCompletionSummaries(
  characterRows: readonly CompletionCharacterRow[],
  companionRows: readonly CompletionCompanionRow[],
  accountCompletion: AccountCompletion | null | undefined
): CompletionSummaries {
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
  } = transformCompletionCharacters(characterRows, accountCollectibles)

  const characterAchievementProgress = transformCharacterAchievementProgress(characterRows)
  const cadwellProgress = transformCadwellProgress(characterRows)
  const skillPointsProgress = transformSkillPointsProgress(characterRows)
  const questProgress = transformQuestProgress(characterRows)
  const companionQuestProgress = transformCompanionQuestProgress(characterRows)
  const poiProgress = transformPoiProgress(characterRows)
  const zoneProgress = transformZoneCompletionProgress(characterRows)
  const companionRapportProgress = transformCharacterCompanionRapport(
    characterRows.map((r) => ({ id: r.id, completion: r.completion ?? null }))
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

  const accountAchievementProgress = transformAccountAchievementProgress(
    accountCompletion,
    characterRows
  )
  const accountSummary = buildAccountSummary(
    accountAchievementProgress,
    accountCompletion?.championPointsEarned ?? 0,
    transformAntiquityLoreProgress(accountCompletion),
    transformCollectiblesProgress(accountCompletion),
    transformItemSetProgress(accountCompletion),
    loreProgress,
    transformAccountPoiUnion(poiProgress),
    transformAccountQuestUnion(questProgress),
    transformAccountRecipeUnion(recipeProgress),
    transformAccountScribingUnion(scribingProgress),
    transformAccountTraitResearchUnion(traitResearchProgress),
    transformTributeProgress(accountCompletion),
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
    characterRows.map((r) => ({ completion: r.completion ?? null }))
  )
  const companionSummary = buildCompanionSummary(
    companionProgress,
    companionSkillLineProgress,
    transformCompanionQuestUnion(companionQuestProgress)
  )

  return { accountSummary, characterSummary, companionSummary }
}

export interface ScopeRollup {
  readonly count: number
  readonly total: number
}

export function sumAccountScope(accountSummary: AccountSummaryData): ScopeRollup {
  let count = 0
  let total = 0
  for (const card of CUMULATIVE_ACCOUNT_CARDS) {
    count += accountSummary[card.id].count
    total += accountSummary[card.id].total
  }
  return { count, total }
}

export function sumCharacterScope(characterSummary: CharacterSummaryData): ScopeRollup {
  let count = 0
  let total = 0
  for (const card of CUMULATIVE_CHARACTER_CARDS) {
    count += characterSummary[card.id].count
    total += characterSummary[card.id].total
  }
  return { count, total }
}

export function sumCompanionScope(companionSummary: CompanionSummaryData): ScopeRollup {
  let count = 0
  let total = 0
  for (const entry of Object.values(companionSummary)) {
    count += entry.count
    total += entry.total
  }
  return { count, total }
}

export function computeOverallCompletionScore(
  accountSummary: AccountSummaryData,
  characterSummary: CharacterSummaryData,
  companionSummary: CompanionSummaryData
): number {
  return (
    sumAccountScope(accountSummary).count +
    sumCharacterScope(characterSummary).count +
    sumCompanionScope(companionSummary).count
  )
}

export function computeOverallCompletionScoreFromRows(
  characterRows: readonly CompletionCharacterRow[],
  companionRows: readonly CompletionCompanionRow[],
  accountCompletion: AccountCompletion | null | undefined
): number {
  const { accountSummary, characterSummary, companionSummary } = buildCompletionSummaries(
    characterRows,
    companionRows,
    accountCompletion
  )
  return computeOverallCompletionScore(accountSummary, characterSummary, companionSummary)
}
