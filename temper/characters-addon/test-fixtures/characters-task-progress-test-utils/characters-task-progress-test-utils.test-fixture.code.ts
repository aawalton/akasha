import type { SavedCharacterEntry } from "akasha/temper/player-completion-state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

export function characterEntry(fields: Partial<SavedCharacterEntry>): SavedCharacterEntry {
  return { name: "Fixture Character", ...fields }
}
