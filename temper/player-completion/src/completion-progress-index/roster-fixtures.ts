import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterEntry } from "../completion-next-character-resolver"

export function mkRosterEntry(
  id: string,
  name: string,
  sortOrder: number | null,
  completion: CharacterCompletion | null
): CompletionCharacterEntry {
  return { id, name, firstName: name, sortOrder, completion }
}

export const EMPTY_ACCOUNT: AccountCompletion = { achievements: {} }
