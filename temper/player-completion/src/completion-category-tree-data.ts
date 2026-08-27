import type { CompletionCategoryNode, CompletionTab } from "./completion-category-tree-types"
import {
  accountAchievementData,
  characterAchievementData,
} from "./generated/achievement-data.generated"
import { COMPLETION_CATEGORY_TREE_STATIC } from "./generated/temper-completion-category.generated"

function buildAchievementChildren(
  data: typeof accountAchievementData
): readonly CompletionCategoryNode[] {
  return data.map((cat) => ({
    id: cat.name,
    name: cat.name,
    children: cat.subCategories.map((sub) => ({
      id: sub.name,
      name: sub.name,
    })),
  }))
}

function attachAchievementChildren(
  cards: readonly CompletionCategoryNode[],
  achievementCardId: string,
  achievementData: typeof accountAchievementData
): readonly CompletionCategoryNode[] {
  return cards.map((card) => {
    if (card.id !== achievementCardId) return card
    return { ...card, children: buildAchievementChildren(achievementData) }
  })
}

export const COMPLETION_CATEGORY_TREE: Record<CompletionTab, readonly CompletionCategoryNode[]> = {
  account: attachAchievementChildren(
    COMPLETION_CATEGORY_TREE_STATIC.account,
    "account-achievements",
    accountAchievementData
  ),
  characters: attachAchievementChildren(
    COMPLETION_CATEGORY_TREE_STATIC.characters,
    "character-achievements",
    characterAchievementData
  ),
  companions: COMPLETION_CATEGORY_TREE_STATIC.companions,
}
