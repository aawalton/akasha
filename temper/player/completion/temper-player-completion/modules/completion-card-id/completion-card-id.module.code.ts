import {
  ACCOUNT_CARDS,
  type AccountCardId,
  CHARACTER_CARDS,
  type CharacterCardId,
  COMPANION_CARDS,
  type CompanionCardId,
  TASK_CARDS,
  type TaskCardId,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"

export type AnyCompletionCardId = AccountCardId | CharacterCardId | CompanionCardId | TaskCardId

const ALL_COMPLETION_CARD_IDS = new Set<string>([
  ...ACCOUNT_CARDS.map((c) => c.id),
  ...CHARACTER_CARDS.map((c) => c.id),
  ...COMPANION_CARDS.map((c) => c.id),
  ...TASK_CARDS.map((c) => c.id),
])

export function isAnyCompletionCardId(value: string): value is AnyCompletionCardId {
  return ALL_COMPLETION_CARD_IDS.has(value)
}
