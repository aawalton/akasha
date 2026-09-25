import { TOTAL_GRAND_MASTER_STATIONS } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import type {
  AccountRecipeUnionProgress,
  AccountScribingUnionProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-recipe-scribing-union/completion-account-recipe-scribing-union.module.code.ts"
import type { AccountTraitResearchUnionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-trait-union/completion-account-trait-union.module.code.ts"
import type { AccountQuestUnionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type { AccountPoiUnionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-zone-poi-union/completion-account-zone-poi-union.module.code.ts"
import type { AccountAchievementOverallProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type {
  ProgressLeaf,
  ProgressNode,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-nodes/completion-progress-nodes.module.code.ts"
import type {
  AccountCollectiblesProgress,
  AccountTributeProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"

function oneOf(key: string, label: string, done: boolean): ProgressLeaf {
  return { key, label, count: done ? 1 : 0, total: 1 }
}

export function accountAchievementNodes(
  progress: AccountAchievementOverallProgress
): readonly ProgressNode[] {
  return progress.categories.map((category) => ({
    key: category.name,
    label: category.name,
    children: category.subCategories.map((sub) => ({
      key: sub.name,
      label: sub.name,
      children: sub.achievements.map((achievement) => ({
        key: String(achievement.achievementId),
        label: achievement.name,
        count: achievement.completedSteps >= achievement.totalSteps ? achievement.points : 0,
        total: achievement.points,
      })),
    })),
  }))
}

export function accountCollectibleNodes(
  progress: AccountCollectiblesProgress
): readonly ProgressNode[] {
  return progress.categories.map((category) => {
    const onlySubCategory =
      category.subCategories.length === 1 ? category.subCategories[0] : undefined
    const key = String(category.categoryIndex)
    if (onlySubCategory) {
      return {
        key,
        label: category.name,
        children: onlySubCategory.collectibles.map((c) => oneOf(String(c.id), c.name, c.unlocked)),
      }
    }
    return {
      key,
      label: category.name,
      children: category.subCategories.map((sub) => ({
        key: sub.name,
        label: sub.name,
        children: sub.collectibles.map((c) => oneOf(String(c.id), c.name, c.unlocked)),
      })),
    }
  })
}

export function accountPoiNodes(poiUnion: AccountPoiUnionProgress): readonly ProgressNode[] {
  return poiUnion.zones.map((zone) => ({
    key: String(zone.zoneId),
    label: zone.name,
    children: zone.poiTypes.map((pt) => ({
      key: `${zone.zoneId}-${pt.poiType}`,
      label: pt.label,
      children: pt.pois.map((poi) => oneOf(String(poi.poiIndex), poi.name, poi.discovered)),
    })),
  }))
}

export function accountQuestNodes(questUnion: AccountQuestUnionProgress): readonly ProgressNode[] {
  return questUnion.zones.map((zone) => ({
    key: zone.zoneName,
    label: zone.zoneName,
    children: zone.quests.map((quest) => oneOf(String(quest.questId), quest.name, quest.completed)),
  }))
}

export function accountRecipeNodes(
  recipeUnion: AccountRecipeUnionProgress
): readonly ProgressNode[] {
  return recipeUnion.entries.map((entry) => ({
    key: String(entry.listIndex),
    label: entry.name,
    children: entry.recipes.map((recipe) =>
      oneOf(String(recipe.itemId), recipe.name, recipe.known)
    ),
  }))
}

const SCRIBING_CATEGORIES = [
  { key: "grimoires", label: "Grimoires" },
  { key: "focusScripts", label: "Focus Scripts" },
  { key: "signatureScripts", label: "Signature Scripts" },
  { key: "affixScripts", label: "Affix Scripts" },
] as const

export function accountScribingNodes(
  scribingUnion: AccountScribingUnionProgress
): readonly ProgressNode[] {
  return SCRIBING_CATEGORIES.map((category) => ({
    key: category.key,
    label: category.label,
    children: scribingUnion[category.key].map((item) => oneOf(item.name, item.name, item.unlocked)),
  }))
}

export function accountTraitResearchNodes(
  traitResearchUnion: AccountTraitResearchUnionProgress
): readonly ProgressNode[] {
  return traitResearchUnion.craftTypes.map((craftType) => ({
    key: String(craftType.craftingType),
    label: craftType.name,
    children: craftType.lines.map((line) => ({
      key: String(line.researchLineIndex),
      label: line.name,
      children: line.traits.map((trait) =>
        oneOf(String(trait.traitIndex), trait.name, trait.known)
      ),
    })),
  }))
}

export function accountTributeNodes(
  tributeProgress: AccountTributeProgress
): readonly ProgressNode[] {
  return tributeProgress.patrons.map((patron) => ({
    key: String(patron.patronId),
    label: patron.name,
    children: [
      oneOf(`${patron.patronId}-unlock`, "Patron Unlocked", patron.unlocked),
      ...patron.cards.map((card) =>
        oneOf(
          `${patron.patronId}-${card.cardIndex}`,
          `${card.baseCardName} → ${card.upgradeCardName}`,
          card.upgraded
        )
      ),
    ],
  }))
}

const GRAND_MASTER_FALLBACK_LABELS = ["Blacksmithing", "Clothier", "Jewelrycrafting", "Woodworking"]

function unlockedStationCount(raw: unknown): number {
  if (Array.isArray(raw)) return raw.length
  if (typeof raw === "object" && raw !== null) return Object.keys(raw).length
  return 0
}

export function grandMasterStationNodes(
  stations: Record<number, { name: string; unlocked: number[] }> | undefined
): readonly ProgressLeaf[] {
  if (stations === undefined || Object.keys(stations).length === 0) {
    return GRAND_MASTER_FALLBACK_LABELS.map((label) => ({
      key: label,
      label,
      count: 0,
      total: TOTAL_GRAND_MASTER_STATIONS,
    }))
  }
  return Object.entries(stations)
    .map(([key, entry]) => ({
      key,
      label: entry.name,
      count: unlockedStationCount(entry.unlocked),
      total: TOTAL_GRAND_MASTER_STATIONS,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}
