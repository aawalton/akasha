import type { SubclassingSkillMorphProgressResult } from "@temper/game-characters-skills-morphs-core/subclassing-morph-progress"
import { transformSubclassingSkillMorphProgress } from "@temper/game-characters-skills-morphs-core/subclassing-morph-progress"
import type {
  AccountRecipeUnionProgress,
  AccountScribingUnionProgress,
} from "@temper/player-completion/completion-account-recipe-scribing-union"
import {
  transformAccountRecipeUnion,
  transformAccountScribingUnion,
} from "@temper/player-completion/completion-account-recipe-scribing-union"
import type { AccountTraitResearchUnionProgress } from "@temper/player-completion/completion-account-trait-union"
import { transformAccountTraitResearchUnion } from "@temper/player-completion/completion-account-trait-union"
import type { AccountQuestUnionProgress } from "@temper/player-completion/completion-account-union-progress"
import { transformAccountQuestUnion } from "@temper/player-completion/completion-account-union-progress"
import type {
  AccountPoiUnionProgress,
  AccountZoneCompletionUnionProgress,
} from "@temper/player-completion/completion-account-zone-poi-union"
import {
  transformAccountPoiUnion,
  transformAccountZoneCompletionUnion,
} from "@temper/player-completion/completion-account-zone-poi-union"
import type { AccountAchievementOverallProgress } from "@temper/player-completion/completion-achievement-progress"
import { transformAccountAchievementProgress } from "@temper/player-completion/completion-achievement-progress"
import { transformAntiquityLoreProgress } from "@temper/player-completion/completion-antiquity-lore-progress"
import { transformCollectiblesProgress } from "@temper/player-completion/completion-collectibles-progress"
import type { ItemSetOverallProgress } from "@temper/player-completion/completion-item-set-progress"
import { transformItemSetProgress } from "@temper/player-completion/completion-item-set-progress"
import { isAccountMeasured } from "@temper/player-completion/completion-measured"
import type { SubclassingSkillLineProgressResult } from "@temper/player-completion/completion-subclassing-progress"
import { transformSubclassingSkillLineProgress } from "@temper/player-completion/completion-subclassing-progress"
import { buildAccountSummary } from "@temper/player-completion/completion-summary-account"
import { transformTributeProgress } from "@temper/player-completion/completion-tribute-progress"
import type {
  AccountAntiquityLoreProgress,
  AccountCollectiblesProgress,
  AccountLoreProgress,
  AccountTributeProgress,
} from "@temper/player-completion/completion-ui-types"
import type { useAccountCompletion, useCompletionCharacters } from "@temper/player-completion-ui/use-completion"
import { useMemo } from "react"
import type { AccountSummaryData } from "@temper/player-completion/completion-card-registry"
import type { CharacterProgressData } from "@/components/completion/completion-progress/character-progress"

export interface AccountProgressData {
  measured: boolean
  accountAchievementProgress: AccountAchievementOverallProgress
  antiquityLoreProgress: AccountAntiquityLoreProgress
  collectiblesProgress: AccountCollectiblesProgress
  recipeUnion: AccountRecipeUnionProgress
  traitResearchUnion: AccountTraitResearchUnionProgress
  itemSetProgress: ItemSetOverallProgress
  loreProgress: AccountLoreProgress
  poiUnion: AccountPoiUnionProgress
  questUnion: AccountQuestUnionProgress
  scribingUnion: AccountScribingUnionProgress
  subclassingSkillLines: SubclassingSkillLineProgressResult
  subclassingSkillMorphs: SubclassingSkillMorphProgressResult
  tributeProgress: AccountTributeProgress
  zoneCompletionUnion: AccountZoneCompletionUnionProgress
  bankUpgrade: { current: number; max: number }
  championPointsEarned: number
  grandMasterStations: Record<number, { name: string; unlocked: number[] }> | undefined
}

interface UseAccountProgressArgs {
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  accountCompletion: ReturnType<typeof useAccountCompletion>["account"]
  characterProgress: CharacterProgressData
  loreProgress: AccountLoreProgress
}

export interface UseAccountProgressResult {
  accountProgress: AccountProgressData
  accountSummary: AccountSummaryData
}

export function useAccountProgress({
  rows,
  accountCompletion,
  characterProgress,
  loreProgress,
}: UseAccountProgressArgs): UseAccountProgressResult {
  const {
    poiProgress,
    questProgress,
    recipeProgress,
    scribingProgress,
    traitResearchProgress,
    zoneProgress,
  } = characterProgress

  const itemSetProgress = useMemo(
    () => transformItemSetProgress(accountCompletion),
    [accountCompletion]
  )
  const accountAchievementProgress = useMemo(
    () => transformAccountAchievementProgress(accountCompletion, rows),
    [accountCompletion, rows]
  )
  const antiquityLoreProgress = useMemo(
    () => transformAntiquityLoreProgress(accountCompletion),
    [accountCompletion]
  )
  const collectiblesProgress = useMemo(
    () => transformCollectiblesProgress(accountCompletion),
    [accountCompletion]
  )
  const questUnion = useMemo(() => transformAccountQuestUnion(questProgress), [questProgress])
  const poiUnion = useMemo(() => transformAccountPoiUnion(poiProgress), [poiProgress])
  const zoneCompletionUnion = useMemo(
    () => transformAccountZoneCompletionUnion(zoneProgress),
    [zoneProgress]
  )
  const recipeUnion = useMemo(() => transformAccountRecipeUnion(recipeProgress), [recipeProgress])
  const scribingUnion = useMemo(
    () => transformAccountScribingUnion(scribingProgress),
    [scribingProgress]
  )
  const traitResearchUnion = useMemo(
    () => transformAccountTraitResearchUnion(traitResearchProgress),
    [traitResearchProgress]
  )
  const subclassingSkillLines = useMemo(
    () => transformSubclassingSkillLineProgress(accountCompletion),
    [accountCompletion]
  )
  const subclassingSkillMorphs = useMemo(
    () =>
      transformSubclassingSkillMorphProgress({
        subclassingSkillLineProgress: accountCompletion?.subclassingSkillLineProgress,
      }),
    [accountCompletion]
  )
  const tributeProgress = useMemo(
    () => transformTributeProgress(accountCompletion),
    [accountCompletion]
  )
  const accountSummary = useMemo(
    () =>
      buildAccountSummary(
        accountAchievementProgress,
        accountCompletion?.championPointsEarned ?? 0,
        antiquityLoreProgress,
        collectiblesProgress,
        itemSetProgress,
        loreProgress,
        poiUnion,
        questUnion,
        recipeUnion,
        scribingUnion,
        traitResearchUnion,
        tributeProgress,
        zoneCompletionUnion,
        accountCompletion?.bankUpgrade ?? { current: 0, max: 0 },
        accountCompletion?.grandMasterStations,
        subclassingSkillLines,
        subclassingSkillMorphs
      ),
    [
      accountAchievementProgress,
      accountCompletion?.championPointsEarned,
      antiquityLoreProgress,
      collectiblesProgress,
      itemSetProgress,
      loreProgress,
      poiUnion,
      questUnion,
      recipeUnion,
      scribingUnion,
      subclassingSkillLines,
      subclassingSkillMorphs,
      traitResearchUnion,
      tributeProgress,
      zoneCompletionUnion,
      accountCompletion?.bankUpgrade,
      accountCompletion?.grandMasterStations,
    ]
  )

  const bankUpgrade = useMemo(
    () => accountCompletion?.bankUpgrade ?? { current: 0, max: 0 },
    [accountCompletion]
  )
  const championPointsEarned = accountCompletion?.championPointsEarned ?? 0
  const grandMasterStations = accountCompletion?.grandMasterStations
  const measured = isAccountMeasured(accountCompletion)

  const accountProgress: AccountProgressData = {
    measured,
    accountAchievementProgress,
    antiquityLoreProgress,
    collectiblesProgress,
    recipeUnion,
    traitResearchUnion,
    itemSetProgress,
    loreProgress,
    poiUnion,
    questUnion,
    scribingUnion,
    subclassingSkillLines,
    subclassingSkillMorphs,
    tributeProgress,
    zoneCompletionUnion,
    bankUpgrade,
    championPointsEarned,
    grandMasterStations,
  }

  return { accountProgress, accountSummary }
}
