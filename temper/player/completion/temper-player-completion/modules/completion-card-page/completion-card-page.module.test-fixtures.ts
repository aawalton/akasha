import { PAGE_BY_CARD } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-page/completion-card-page.module.code.ts"

export function pageSlugOfCompletionCard(cardId: string): string | null {
  return PAGE_BY_CARD.get(cardId) ?? null
}

export const COMPLETION_CARD_PAGE_TYPE = "temper-completion-category"

export function completionCardAddress(cardId: string): string | null {
  const slug = pageSlugOfCompletionCard(cardId)
  return slug === null ? null : `${COMPLETION_CARD_PAGE_TYPE}/${slug}`
}
