import { COMPLETION_CATEGORY_TREE_STATIC } from "../completion-category-tree/completion-category-tree.module.code.ts"
import type { CompletionTab } from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"

export type AccountCardId = (typeof COMPLETION_CATEGORY_TREE_STATIC.account)[number]["id"]
export type CharacterCardId = (typeof COMPLETION_CATEGORY_TREE_STATIC.characters)[number]["id"]
export type CompanionCardId = (typeof COMPLETION_CATEGORY_TREE_STATIC.companions)[number]["id"]
export type CompletionCardId = AccountCardId | CharacterCardId | CompanionCardId

export interface CardDescriptor<T extends CompletionCardId> {
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

export type AccountSummaryData = Record<AccountCardId, { count: number; total: number }>
export type CharacterSummaryData = Record<CharacterCardId, { count: number; total: number }>
export type CompanionSummaryData = Record<CompanionCardId, { count: number; total: number }>
