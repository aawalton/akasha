import {
  CARD_IDS,
  completionCardTitle,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import type { CompletionTab } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree-types/completion-category-tree-types.module.code.ts"

export type AccountCardId = (typeof CARD_IDS.account)[number]
export type CharacterCardId = (typeof CARD_IDS.characters)[number]
export type CompanionCardId = (typeof CARD_IDS.companions)[number]
export type TaskCardId = (typeof CARD_IDS.tasks)[number]
type CompletionCardId = AccountCardId | CharacterCardId | CompanionCardId | TaskCardId

export interface CardDescriptor<T extends CompletionCardId> {
  readonly id: T
  readonly tab: CompletionTab
  readonly title: string
}

function cardsOf<T extends CompletionCardId>(
  tab: CompletionTab,
  ids: readonly T[]
): CardDescriptor<T>[] {
  return ids.map((id) => ({
    id,
    tab,
    get title() {
      return completionCardTitle(tab, id)
    },
  }))
}

export const ACCOUNT_CARDS: CardDescriptor<AccountCardId>[] = cardsOf("account", CARD_IDS.account)

export const CHARACTER_CARDS: CardDescriptor<CharacterCardId>[] = cardsOf(
  "characters",
  CARD_IDS.characters
)

export const COMPANION_CARDS: CardDescriptor<CompanionCardId>[] = cardsOf(
  "companions",
  CARD_IDS.companions
)

export const TASK_CARDS: CardDescriptor<TaskCardId>[] = cardsOf("tasks", CARD_IDS.tasks)

export type AccountSummaryData = Record<AccountCardId, { count: number; total: number }>
export type CharacterSummaryData = Record<CharacterCardId, { count: number; total: number }>
export type CompanionSummaryData = Record<CompanionCardId, { count: number; total: number }>
