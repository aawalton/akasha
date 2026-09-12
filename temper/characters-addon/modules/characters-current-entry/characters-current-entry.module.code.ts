import type { SavedCharacterEntry } from "akasha/temper/player-completion-state/completion-saved-variables/completion-saved-variables.module.code.ts"
import { getSavedVariables } from "akasha/temper/player-completion-state/completion-saved-variables/completion-saved-variables.module.code.ts"

export function currentCharacterEntry(this: void): SavedCharacterEntry | undefined {
  return getSavedVariables().characters[GetCurrentCharacterId()]
}
