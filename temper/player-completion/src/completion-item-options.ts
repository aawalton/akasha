import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import type {
  AccountCompletionCardChecker,
  CompletionCardChecker,
  ItemPickerLevel,
} from "./completion-card-checker-types"
import { COMPLETION_CARD_CHECKERS } from "./completion-card-checkers"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "./account-checkers"
import type { AnyCompletionCardId } from "./completion-card-id"

export function getItemPickerLevels(
  cardId: AnyCompletionCardId,
  completions: readonly CharacterCompletion[],
  currentPath: readonly (string | number)[]
): ItemPickerLevel | null {
  const accountRegistry: Record<string, AccountCompletionCardChecker | undefined> =
    ACCOUNT_COMPLETION_CARD_CHECKERS
  if (cardId in accountRegistry) {
    const accountChecker = accountRegistry[cardId]
    if (!accountChecker) return null
    return accountChecker.getItemPickerLevels?.(currentPath) ?? null
  }

  const characterRegistry: Record<string, CompletionCardChecker | undefined> =
    COMPLETION_CARD_CHECKERS
  const checker = characterRegistry[cardId]
  if (!checker) return null
  return checker.getItemPickerLevels?.(completions, currentPath) ?? null
}
