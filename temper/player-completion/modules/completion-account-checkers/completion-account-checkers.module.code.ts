import type { AccountCompletionCardChecker } from "akasha/temper/player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { AccountCardId } from "akasha/temper/player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"

export const ACCOUNT_COMPLETION_CARD_CHECKERS: Partial<
  Record<AccountCardId, AccountCompletionCardChecker>
> = {}
