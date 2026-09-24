import {
  type AnyCompletionCardId,
  isAnyCompletionCardId,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-id/completion-card-id.module.code.ts"
import { COMPLETION_CATEGORY_TREE_STATIC } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import type { CompletionTab } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree-types/completion-category-tree-types.module.code.ts"

const TABS: readonly CompletionTab[] = ["account", "characters", "companions", "tasks"]

const JOINED_BY = "-"

function pagesByCard(): Map<string, string> {
  const made = new Map<string, string>()
  for (const tab of TABS) {
    for (const node of COMPLETION_CATEGORY_TREE_STATIC[tab]) {
      made.set(node.id, `${tab}${JOINED_BY}${node.id}`)
    }
  }
  return made
}

export const PAGE_BY_CARD: ReadonlyMap<string, string> = pagesByCard()

const CARD_BY_PAGE = new Map([...PAGE_BY_CARD].map(([card, page]) => [page, card]))

export function completionCardOfPageSlug(pageSlug: string): AnyCompletionCardId | null {
  const held = CARD_BY_PAGE.get(pageSlug)
  if (held === undefined || !isAnyCompletionCardId(held)) return null
  return held
}
