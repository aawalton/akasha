import type { AnyCompletionCardId } from "akasha/temper/player-completion/modules/completion-card-id/completion-card-id.module.code.ts"

export interface CompletionOverride {
  completionCardId: AnyCompletionCardId
  completionItemPath: readonly (string | number)[]
  floor: number
}
