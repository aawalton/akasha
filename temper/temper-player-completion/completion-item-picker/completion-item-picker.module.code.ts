import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "../completion-account-checkers/completion-account-checkers.module.code.ts"
import type {
  AccountCompletionCardChecker,
  CompletionCardChecker,
  ItemPickerLevel,
} from "../completion-card-checker-types/completion-card-checker-types.module.code.ts"
import { COMPLETION_CARD_CHECKERS } from "../completion-card-checkers/completion-card-checkers.module.code.ts"
import type { AnyCompletionCardId } from "../completion-card-id/completion-card-id.module.code.ts"

export type ItemPath = readonly (string | number)[]

export function accountCheckerFor(
  cardId: AnyCompletionCardId
): AccountCompletionCardChecker | undefined {
  const registry: Record<string, AccountCompletionCardChecker | undefined> =
    ACCOUNT_COMPLETION_CARD_CHECKERS
  if (!(cardId in registry)) return undefined
  return registry[cardId]
}

export function isAccountCard(cardId: AnyCompletionCardId): boolean {
  const registry: Record<string, AccountCompletionCardChecker | undefined> =
    ACCOUNT_COMPLETION_CARD_CHECKERS
  return cardId in registry
}

export function characterCheckerFor(
  cardId: AnyCompletionCardId
): CompletionCardChecker | undefined {
  const registry: Record<string, CompletionCardChecker | undefined> = COMPLETION_CARD_CHECKERS
  return registry[cardId]
}

export function getItemPickerLevels(
  cardId: AnyCompletionCardId,
  completions: readonly CharacterCompletion[],
  currentPath: ItemPath
): ItemPickerLevel | null {
  if (isAccountCard(cardId)) {
    const accountChecker = accountCheckerFor(cardId)
    if (!accountChecker) return null
    return accountChecker.getItemPickerLevels?.(currentPath) ?? null
  }

  const checker = characterCheckerFor(cardId)
  if (!checker) return null
  return checker.getItemPickerLevels?.(completions, currentPath) ?? null
}

export function enumerateLeafPaths(
  cardId: AnyCompletionCardId,
  completions: readonly CharacterCompletion[],
  basePath: ItemPath
): readonly ItemPath[] {
  const leaves: ItemPath[] = []

  function walk(currentPath: ItemPath): undefined {
    const level = getItemPickerLevels(cardId, completions, currentPath)
    if (level === null) {
      leaves.push(currentPath)
      return
    }
    for (const option of level.options) walk([...currentPath, option.value])
    return
  }

  walk(basePath)
  return leaves
}

export function enumeratePaths(
  cardId: AnyCompletionCardId,
  completions: readonly CharacterCompletion[]
): readonly ItemPath[] {
  const paths: ItemPath[] = []

  function walk(currentPath: ItemPath): undefined {
    paths.push(currentPath)
    const level = getItemPickerLevels(cardId, completions, currentPath)
    if (level === null) return
    for (const option of level.options) walk([...currentPath, option.value])
    return
  }

  walk([])
  return paths
}
