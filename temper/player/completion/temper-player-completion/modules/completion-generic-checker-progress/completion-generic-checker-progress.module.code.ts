import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type {
  AccountCheckerInput,
  ItemProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { AnyCompletionCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-id/completion-card-id.module.code.ts"
import type { CompletionCatalogs } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import {
  accountCheckerFor,
  characterCheckerFor,
  enumerateLeafPaths,
  getItemPickerLevels,
  type ItemPath,
  isAccountCard,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-item-picker/completion-item-picker.module.code.ts"

function resolveLeafDetail<C>(
  checker: {
    getLeafDetailProgress?: (completion: C, itemPath: ItemPath) => ItemProgress | undefined
  },
  cardId: AnyCompletionCardId,
  pickerCompletions: readonly CharacterCompletion[],
  basePath: ItemPath,
  completion: C
): ItemProgress | undefined {
  if (checker.getLeafDetailProgress === undefined) return undefined
  if (getItemPickerLevels(cardId, pickerCompletions, basePath) !== null) return undefined
  return checker.getLeafDetailProgress(completion, basePath)
}

function sumLeaves<C>(
  checker: {
    getItemProgress?: (
      completion: C,
      itemPath: ItemPath,
      catalogs: CompletionCatalogs
    ) => ItemProgress | undefined
    isItemComplete?: (completion: C, itemPath: ItemPath, catalogs: CompletionCatalogs) => boolean
  },
  completion: C,
  leaves: readonly ItemPath[],
  catalogs: CompletionCatalogs
): ItemProgress | undefined {
  let current = 0
  let total = 0
  let contributed = false

  for (const leaf of leaves) {
    const numeric = checker.getItemProgress?.(completion, leaf, catalogs)
    if (numeric !== undefined) {
      current += numeric.current
      total += numeric.total
      contributed = true
      continue
    }
    if (checker.isItemComplete !== undefined) {
      current += checker.isItemComplete(completion, leaf, catalogs) ? 1 : 0
      total += 1
      contributed = true
    }
  }

  if (!contributed) return undefined
  return { current, total }
}

export function resolveGenericCheckerProgress(
  cardId: AnyCompletionCardId,
  itemPath: ItemPath | null | undefined,
  charCompletion: CharacterCompletion | null | undefined,
  account: AccountCheckerInput
): ItemProgress | undefined {
  const basePath = itemPath ?? []

  if (isAccountCard(cardId)) {
    const accountChecker = accountCheckerFor(cardId)
    if (!accountChecker) return undefined
    const detail = resolveLeafDetail(accountChecker, cardId, [], basePath, account)
    if (detail !== undefined) return detail
    const leaves = enumerateLeafPaths(cardId, [], basePath)
    return sumLeaves(accountChecker, account, leaves, account.catalogs)
  }

  const checker = characterCheckerFor(cardId)
  if (!checker) return undefined
  const completions = charCompletion ? [charCompletion] : []
  const detail = resolveLeafDetail(checker, cardId, completions, basePath, charCompletion ?? null)
  if (detail !== undefined) return detail
  const leaves = enumerateLeafPaths(cardId, completions, basePath)
  return sumLeaves(checker, charCompletion ?? null, leaves, account.catalogs)
}
