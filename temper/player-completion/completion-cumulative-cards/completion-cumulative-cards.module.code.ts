import {
  ACCOUNT_CARDS,
  type AccountCardId,
  type CardDescriptor,
  CHARACTER_CARDS,
  type CharacterCardId,
} from "../completion-card-registry/completion-card-registry.module.code.ts"
import { isCumulativeCard } from "../completion-card-reset-behavior/completion-card-reset-behavior.module.code.ts"

export const CUMULATIVE_ACCOUNT_CARDS: CardDescriptor<AccountCardId>[] = ACCOUNT_CARDS.filter((c) =>
  isCumulativeCard(c.id)
)

export const CUMULATIVE_CHARACTER_CARDS: CardDescriptor<CharacterCardId>[] = CHARACTER_CARDS.filter(
  (c) => isCumulativeCard(c.id)
)
