import { MAX_CHAMPION_POINTS } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { AccountCompletion } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import { transformAccountLoreUnion } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-lore-union/completion-account-lore-union.module.code.ts"
import { grandMasterStationNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import {
  transformAccountRecipeUnion,
  transformAccountScribingUnion,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-recipe-scribing-union/completion-account-recipe-scribing-union.module.code.ts"
import { transformAccountTraitResearchUnion } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-trait-union/completion-account-trait-union.module.code.ts"
import { transformAccountQuestUnion } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import {
  transformAccountPoiUnion,
  transformAccountZoneCompletionUnion,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-zone-poi-union/completion-account-zone-poi-union.module.code.ts"
import { transformAccountAchievementProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import { transformAntiquityLoreProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-antiquity-lore-progress/completion-antiquity-lore-progress.module.code.ts"
import type {
  AccountCheckerInput,
  AccountCompletionCardChecker,
  ItemProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { transformCollectiblesProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-collectibles-progress/completion-collectibles-progress.module.code.ts"
import { transformItemSetProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-item-set-progress/completion-item-set-progress.module.code.ts"
import { isCharacterMeasured } from "akasha/temper/player/completion/temper-player-completion/modules/completion-measured/completion-measured.module.code.ts"
import { transformPoiProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-poi-progress/completion-poi-progress.module.code.ts"
import {
  isNodesComplete,
  type ProgressNode,
  pickerLevelAt,
  progressAt,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-nodes/completion-progress-nodes.module.code.ts"
import { transformQuestProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-quest-progress/completion-quest-progress.module.code.ts"
import { transformRecipeProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-recipe-progress/completion-recipe-progress.module.code.ts"
import { transformScribingProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-scribing-progress/completion-scribing-progress.module.code.ts"
import { transformSubclassingSkillLineProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-subclassing-progress/completion-subclassing-progress.module.code.ts"
import { transformTraitResearchProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import { transformTributeProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-tribute-progress/completion-tribute-progress.module.code.ts"
import { transformZoneCompletionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-zone-progress/completion-zone-progress.module.code.ts"
import { transformSubclassingSkillMorphProgress } from "akasha/temper/player/skill-morph/modules/subclassing-morph-progress/subclassing-morph-progress.module.code.ts"

type Nodes = (completion: AccountCompletion | null) => readonly ProgressNode[]

function remembered(build: Nodes): Nodes {
  const held = new WeakMap<AccountCompletion, readonly ProgressNode[]>()
  let empty: readonly ProgressNode[] | undefined
  return (completion) => {
    if (completion === null) {
      empty ??= build(null)
      return empty
    }
    const already = held.get(completion)
    if (already !== undefined) return already
    const built = build(completion)
    held.set(completion, built)
    return built
  }
}

function nodeChecker(nodes: Nodes, labels: readonly string[]): AccountCompletionCardChecker {
  return {
    isCardComplete: (input) => isNodesComplete(nodes(input.account)),
    getItemProgress: (input, itemPath) => progressAt(nodes(input.account), itemPath),
    getItemPickerLevels: (currentPath) => pickerLevelAt(nodes(null), currentPath, labels),
  }
}

function countChecker(
  count: (input: AccountCheckerInput) => ItemProgress | undefined
): AccountCompletionCardChecker {
  return {
    isCardComplete(input) {
      const counted = count(input)
      return counted !== undefined && counted.total > 0 && counted.current >= counted.total
    },
    getItemProgress: (input, itemPath) => (itemPath.length === 0 ? count(input) : undefined),
  }
}

function measured(current: number, total: number): ItemProgress | undefined {
  return total === 0 ? undefined : { current, total }
}

function skillLineName(skillLineId: keyof typeof skillLines.data): string {
  return skillLines.data[skillLineId].name
}

const subclassingSkillLineNodes = remembered((completion) =>
  transformSubclassingSkillLineProgress(completion).entries.map((entry) => ({
    key: entry.skillLineId,
    label: skillLineName(entry.skillLineId),
    count: entry.currentRank,
    total: entry.maxRank,
  }))
)

const subclassingSkillMorphNodes = remembered((completion) =>
  transformSubclassingSkillMorphProgress({
    subclassingSkillLineProgress: completion?.subclassingSkillLineProgress,
  }).entries.map((entry) => ({
    key: entry.skillLineId,
    label: skillLineName(entry.skillLineId),
    children: entry.skills.map((skill) => ({
      key: skill.baseName,
      label: skill.baseName,
      count: skill.baseRank + skill.morph1Rank + skill.morph2Rank,
      total: 12,
    })),
  }))
)

const grandMasterNodes = remembered((completion) =>
  grandMasterStationNodes(completion?.grandMasterStations)
)

export const ACCOUNT_COMPLETION_CARD_CHECKERS: Partial<
  Record<AccountCardId, AccountCompletionCardChecker>
> = {
  "account-achievements": countChecker(({ account, rows, catalogs }) => {
    const progress = transformAccountAchievementProgress(
      account,
      rows,
      catalogs.achievementCategories
    )
    return measured(progress.earnedPoints, progress.totalPoints)
  }),

  "account-points-of-interest": countChecker(({ rows, catalogs }) => {
    const union = transformAccountPoiUnion(
      transformPoiProgress(rows, catalogs.poiZones),
      catalogs.poiZones
    )
    return measured(union.discoveredCount, union.totalCount)
  }),

  "account-quests": countChecker(({ rows, catalogs }) => {
    const union = transformAccountQuestUnion(transformQuestProgress(rows, catalogs.questZones))
    return measured(union.completedCount, union.totalCount)
  }),

  "account-recipes": countChecker(({ rows }) => {
    const union = transformAccountRecipeUnion(transformRecipeProgress(rows))
    return measured(union.knownCount, union.totalCount)
  }),

  "account-scribing-knowledge": countChecker(({ rows }) => {
    const union = transformAccountScribingUnion(transformScribingProgress(rows))
    return measured(union.unlockedCount, union.totalCount)
  }),

  "account-trait-research": countChecker(({ rows, catalogs }) => {
    const union = transformAccountTraitResearchUnion(
      transformTraitResearchProgress(rows, catalogs.craftTypes, catalogs.researchLines),
      catalogs.craftTypes,
      catalogs.researchLines
    )
    return measured(union.knownCount, union.totalCount)
  }),

  "account-zone-completion": countChecker(({ rows, catalogs }) => {
    const union = transformAccountZoneCompletionUnion(
      transformZoneCompletionProgress(rows, catalogs.zoneCompletionZones)
    )
    return measured(union.completedCount, union.totalCount)
  }),

  "antiquity-lore": countChecker(({ account, catalogs }) => {
    const progress = transformAntiquityLoreProgress(account, catalogs.antiquityCategories)
    return measured(progress.acquiredCount, progress.totalCount)
  }),

  "bank-upgrades": countChecker(({ account }) => {
    const bank = account?.bankUpgrade
    return bank === undefined ? undefined : { current: bank.current, total: bank.max }
  }),

  "champion-points": countChecker(({ account }) => ({
    current: account?.championPointsEarned ?? 0,
    total: MAX_CHAMPION_POINTS,
  })),

  collectibles: countChecker(({ account, catalogs }) => {
    const progress = transformCollectiblesProgress(account, catalogs.collectibleCategories)
    return measured(progress.unlockedCount, progress.totalCount)
  }),

  "grand-master-stations": countChecker(({ account }) => progressAt(grandMasterNodes(account), [])),

  "item-sets": countChecker(({ account }) => {
    const progress = transformItemSetProgress(account)
    return { current: progress.slotsUnlocked, total: progress.totalSlots }
  }),

  "lore-library": countChecker(({ rows }) => {
    if (!rows.some((row) => isCharacterMeasured(row.completion))) return undefined
    const union = transformAccountLoreUnion(rows)
    return measured(union.knownCount, union.totalBooks)
  }),

  "subclassing-skill-lines": nodeChecker(subclassingSkillLineNodes, ["Skill Line"]),

  "subclassing-skill-morphs": nodeChecker(subclassingSkillMorphNodes, ["Skill Line", "Skill"]),

  "tales-of-tribute": countChecker(({ account, catalogs }) => {
    const progress = transformTributeProgress(account, catalogs.tributePatrons)
    return measured(progress.completedCount, progress.totalCount)
  }),
}
