import { COMPLETION_CATEGORY_TREE_STATIC } from "../completion-category-tree/completion-category-tree.module.code.ts"
import type {
  CompletionCategoryNode,
  CompletionCategoryTree,
} from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"

export const ACCOUNT_ACHIEVEMENTS_CARD_ID = "account-achievements"
export const CHARACTER_ACHIEVEMENTS_CARD_ID = "character-achievements"

export interface AchievementSubHeading {
  name: string
}

export interface AchievementHeading {
  name: string
  subCategories: readonly AchievementSubHeading[]
}

function buildAchievementChildren(
  headings: readonly AchievementHeading[]
): readonly CompletionCategoryNode[] {
  return headings.map((heading) => ({
    id: heading.name,
    name: heading.name,
    children: heading.subCategories.map((sub) => ({ id: sub.name, name: sub.name })),
  }))
}

function attachAchievementChildren(
  cards: readonly CompletionCategoryNode[],
  achievementCardId: string,
  headings: readonly AchievementHeading[]
): readonly CompletionCategoryNode[] {
  return cards.map((card) => {
    if (card.id !== achievementCardId) return card
    return { ...card, children: buildAchievementChildren(headings) }
  })
}

export function composeCompletionCategoryTree(
  accountHeadings: readonly AchievementHeading[],
  characterHeadings: readonly AchievementHeading[]
): CompletionCategoryTree {
  return {
    account: attachAchievementChildren(
      COMPLETION_CATEGORY_TREE_STATIC.account,
      ACCOUNT_ACHIEVEMENTS_CARD_ID,
      accountHeadings
    ),
    characters: attachAchievementChildren(
      COMPLETION_CATEGORY_TREE_STATIC.characters,
      CHARACTER_ACHIEVEMENTS_CARD_ID,
      characterHeadings
    ),
    companions: COMPLETION_CATEGORY_TREE_STATIC.companions,
  }
}
