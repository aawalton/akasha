import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import type { CompletionCardChecker } from "./completion-card-checker-types"
import { COMPLETION_CARD_CHECKERS } from "./completion-card-checkers"
import type { AnyCompletionCardId } from "./completion-card-id"

const checkerByCardId = new Map<string, CompletionCardChecker>(
  Object.entries(COMPLETION_CARD_CHECKERS).filter(
    (entry): entry is [string, CompletionCardChecker] => entry[1] !== undefined
  )
)

export interface NextCharacterInput {
  id: string
  name: string
  sortOrder: number | null
  completion: CharacterCompletion | null
}

export interface CompletionCharacterEntry extends NextCharacterInput {
  firstName: string
}

export interface ResolveResult {
  characterId: string
  characterName: string
}

export function resolveNextCharacter(
  characters: readonly NextCharacterInput[],
  cardId: AnyCompletionCardId,
  itemPath?: readonly (string | number)[] | null
): ResolveResult | null {
  const checker = checkerByCardId.get(cardId)
  if (!checker) return null

  const sorted = [...characters].sort((a, b) => {
    const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER
    const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.name.localeCompare(b.name)
  })

  const isItemComplete = checker.isItemComplete
  const checkComplete =
    itemPath != null && itemPath.length > 0 && isItemComplete != null
      ? (completion: CharacterCompletion | null) => isItemComplete(completion, itemPath)
      : (completion: CharacterCompletion | null) => checker.isCardComplete(completion)

  for (const char of sorted) {
    if (!checkComplete(char.completion)) {
      return { characterId: char.id, characterName: char.name }
    }
  }

  return null
}
