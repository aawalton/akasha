import { MAX_CHAMPION_POINTS } from "@akasha/temper-champion-points/champion-point-source"
import { TOTAL_GRAND_MASTER_STATIONS } from "@akasha/temper-completion/completion-progress"
import type { SubclassingSkillMorphProgressResult } from "@akasha/temper-skill-morphs/subclassing-morph-progress"
import type {
  AccountRecipeUnionProgress,
  AccountScribingUnionProgress,
} from "../completion-account-recipe-scribing-union/completion-account-recipe-scribing-union.module.code.ts"
import type { AccountTraitResearchUnionProgress } from "../completion-account-trait-union/completion-account-trait-union.module.code.ts"
import type { AccountQuestUnionProgress } from "../completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type {
  AccountPoiUnionProgress,
  AccountZoneCompletionUnionProgress,
} from "../completion-account-zone-poi-union/completion-account-zone-poi-union.module.code.ts"
import type { AccountAchievementOverallProgress } from "../completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { AccountSummaryData } from "../completion-card-registry/completion-card-registry.module.code.ts"
import type { ItemSetOverallProgress } from "../completion-item-set-progress/completion-item-set-progress.module.code.ts"
import type { SubclassingSkillLineProgressResult } from "../completion-subclassing-progress/completion-subclassing-progress.module.code.ts"
import type {
  AccountAntiquityLoreProgress,
  AccountCollectiblesProgress,
  AccountLoreProgress,
  AccountTributeProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export function buildAccountSummary(
  achievementProgress: AccountAchievementOverallProgress,
  championPointsEarned: number,
  antiquityLoreProgress: AccountAntiquityLoreProgress,
  collectiblesProgress: AccountCollectiblesProgress,
  itemSetProgress: ItemSetOverallProgress,
  loreProgress: AccountLoreProgress,

  poiUnion: AccountPoiUnionProgress,
  questUnion: AccountQuestUnionProgress,
  recipeUnion: AccountRecipeUnionProgress,
  scribingUnion: AccountScribingUnionProgress,
  traitResearchUnion: AccountTraitResearchUnionProgress,
  tributeProgress: AccountTributeProgress,
  zoneCompletionUnion: AccountZoneCompletionUnionProgress,
  bankUpgrade: { current: number; max: number },
  grandMasterStations: Record<number, { name: string; unlocked: number[] }> | undefined,
  subclassingSkillLines: SubclassingSkillLineProgressResult,
  subclassingSkillMorphs: SubclassingSkillMorphProgressResult
): AccountSummaryData {
  return {
    "account-achievements": {
      count: achievementProgress.earnedPoints,
      total: achievementProgress.totalPoints,
    },
    "account-quests": {
      count: questUnion.completedCount,
      total: questUnion.totalCount,
    },
    "account-recipes": {
      count: recipeUnion.knownCount,
      total: recipeUnion.totalCount,
    },
    "account-scribing-knowledge": {
      count: scribingUnion.unlockedCount,
      total: scribingUnion.totalCount,
    },
    "account-trait-research": {
      count: traitResearchUnion.knownCount,
      total: traitResearchUnion.totalCount,
    },
    "account-zone-completion": {
      count: zoneCompletionUnion.completedCount,
      total: zoneCompletionUnion.totalCount,
    },
    "antiquity-leads-legendary": { count: 0, total: 0 },
    "antiquity-leads-motifs": { count: 0, total: 0 },
    "antiquity-lore": {
      count: antiquityLoreProgress.acquiredCount,
      total: antiquityLoreProgress.totalCount,
    },
    "bank-upgrades": {
      count: bankUpgrade.current,
      total: bankUpgrade.max,
    },
    "champion-points": {
      count: championPointsEarned,
      total: MAX_CHAMPION_POINTS,
    },
    "collectibles": {
      count: collectiblesProgress.unlockedCount,
      total: collectiblesProgress.totalCount,
    },
    "grand-master-stations": {
      count: grandMasterStations
        ? Object.values(grandMasterStations).reduce((sum, entry) => {
            const raw = entry.unlocked
            if (Array.isArray(raw)) return sum + raw.length
            if (typeof raw === "object" && raw !== null) return sum + Object.keys(raw).length
            return sum
          }, 0)
        : 0,
      total: TOTAL_GRAND_MASTER_STATIONS * 4,
    },
    "item-sets": {
      count: itemSetProgress.slotsUnlocked,
      total: itemSetProgress.totalSlots,
    },
    "lore-library": {
      count: loreProgress.knownCount,
      total: loreProgress.totalBooks,
    },

    "account-points-of-interest": {
      count: poiUnion.discoveredCount,
      total: poiUnion.totalCount,
    },
    "subclassing-skill-lines": {
      count: subclassingSkillLines.totalRank,
      total: subclassingSkillLines.totalMaxRank,
    },
    "subclassing-skill-morphs": {
      count: subclassingSkillMorphs.totalMorphRank,
      total: subclassingSkillMorphs.totalMorphMax,
    },
    "tales-of-tribute": {
      count: tributeProgress.completedCount,
      total: tributeProgress.totalCount,
    },
  }
}
