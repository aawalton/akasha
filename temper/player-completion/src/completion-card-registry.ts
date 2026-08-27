import { isCumulativeCard } from "./completion-card-reset-behavior"
import type { CompletionTab } from "./completion-category-tree-types"
import { getCompletionCardTab } from "./completion-category-tree-utils"
import { COMPLETION_CATEGORY_TREE_STATIC } from "./generated/temper-completion-category.generated"

export type AccountCardId = (typeof COMPLETION_CATEGORY_TREE_STATIC.account)[number]["id"]
export type CharacterCardId = (typeof COMPLETION_CATEGORY_TREE_STATIC.characters)[number]["id"]
export type CompanionCardId = (typeof COMPLETION_CATEGORY_TREE_STATIC.companions)[number]["id"]
type CompletionCardId = AccountCardId | CharacterCardId | CompanionCardId

interface CardDescriptor<T extends CompletionCardId> {
  id: T
  tab: CompletionTab
  title: string
}

export const ACCOUNT_CARDS: CardDescriptor<AccountCardId>[] =
  COMPLETION_CATEGORY_TREE_STATIC.account.map((n) => ({
    id: n.id,
    tab: "account" as const,
    title: n.name,
  }))

export const CHARACTER_CARDS: CardDescriptor<CharacterCardId>[] =
  COMPLETION_CATEGORY_TREE_STATIC.characters.map((n) => ({
    id: n.id,
    tab: "characters" as const,
    title: n.name,
  }))

export const COMPANION_CARDS: CardDescriptor<CompanionCardId>[] =
  COMPLETION_CATEGORY_TREE_STATIC.companions.map((n) => ({
    id: n.id,
    tab: "companions" as const,
    title: n.name,
  }))

export const CUMULATIVE_ACCOUNT_CARDS: CardDescriptor<AccountCardId>[] = ACCOUNT_CARDS.filter((c) =>
  isCumulativeCard(c.id)
)

export const CUMULATIVE_CHARACTER_CARDS: CardDescriptor<CharacterCardId>[] = CHARACTER_CARDS.filter(
  (c) => isCumulativeCard(c.id)
)

export function getTabForCard(cardId: string): CompletionTab | undefined {
  return getCompletionCardTab(cardId)
}

export type AccountSummaryData = Record<AccountCardId, { count: number; total: number }>
export type CharacterSummaryData = Record<CharacterCardId, { count: number; total: number }>
export type CompanionSummaryData = Record<CompanionCardId, { count: number; total: number }>
