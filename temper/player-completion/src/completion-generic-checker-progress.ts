import type {
  AccountCompletion,
  CharacterCompletion,
} from "@temper/game-completion/completion-types"
import type {
  AccountCompletionCardChecker,
  CompletionCardChecker,
  ItemProgress,
} from "./completion-card-checker-types"
import { COMPLETION_CARD_CHECKERS } from "./completion-card-checkers"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "./account-checkers"
import type { AnyCompletionCardId } from "./completion-card-id"
import { getItemPickerLevels } from "./completion-item-options"

type ItemPath = readonly (string | number)[]

function enumerateLeaves(
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
    for (const option of level.options) {
      walk([...currentPath, option.value])
    }
    return
  }

  walk(basePath)
  return leaves
}

function resolveLeafDetail<C>(
  checker: {
    getLeafDetailProgress?: (completion: C | null, itemPath: ItemPath) => ItemProgress | undefined
  },
  cardId: AnyCompletionCardId,
  pickerCompletions: readonly CharacterCompletion[],
  basePath: ItemPath,
  completion: C | null
): ItemProgress | undefined {
  if (checker.getLeafDetailProgress === undefined) return undefined
  if (getItemPickerLevels(cardId, pickerCompletions, basePath) !== null) return undefined
  return checker.getLeafDetailProgress(completion, basePath)
}

function sumLeaves<C>(
  checker: {
    getItemProgress?: (completion: C | null, itemPath: ItemPath) => ItemProgress | undefined
    isItemComplete?: (completion: C | null, itemPath: ItemPath) => boolean
  },
  completion: C | null,
  leaves: readonly ItemPath[]
): ItemProgress | undefined {
  let current = 0
  let total = 0
  let contributed = false

  for (const leaf of leaves) {
    const numeric = checker.getItemProgress?.(completion, leaf)
    if (numeric !== undefined) {
      current += numeric.current
      total += numeric.total
      contributed = true
      continue
    }
    if (checker.isItemComplete !== undefined) {
      current += checker.isItemComplete(completion, leaf) ? 1 : 0
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
  accountCompletion: AccountCompletion | null | undefined
): ItemProgress | undefined {
  const basePath = itemPath ?? []

  const accountRegistry: Record<string, AccountCompletionCardChecker | undefined> =
    ACCOUNT_COMPLETION_CARD_CHECKERS
  if (cardId in accountRegistry) {
    const accountChecker = accountRegistry[cardId]
    if (!accountChecker) return undefined
    const detail = resolveLeafDetail(
      accountChecker,
      cardId,
      [],
      basePath,
      accountCompletion ?? null
    )
    if (detail !== undefined) return detail
    const leaves = enumerateLeaves(cardId, [], basePath)
    return sumLeaves(accountChecker, accountCompletion ?? null, leaves)
  }

  const characterRegistry: Record<string, CompletionCardChecker | undefined> =
    COMPLETION_CARD_CHECKERS
  const checker = characterRegistry[cardId]
  if (!checker) return undefined
  const completions = charCompletion ? [charCompletion] : []
  const detail = resolveLeafDetail(checker, cardId, completions, basePath, charCompletion ?? null)
  if (detail !== undefined) return detail
  const leaves = enumerateLeaves(cardId, completions, basePath)
  return sumLeaves(checker, charCompletion ?? null, leaves)
}
