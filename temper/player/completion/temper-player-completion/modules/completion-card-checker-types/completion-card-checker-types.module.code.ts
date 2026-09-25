import type {
  AccountCompletion,
  CharacterCompletion,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type { CompletionCatalogs } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import type { CompletionCharacterRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-character-row/completion-character-row.module.code.ts"

export interface ItemPickerLevel {
  label: string
  options: readonly { value: string | number; label: string }[]
}

export interface ItemProgress {
  current: number
  total: number
}

export interface CompletionCardChecker {
  isCardComplete: (completion: CharacterCompletion | null, catalogs: CompletionCatalogs) => boolean
  isItemComplete?: (
    completion: CharacterCompletion | null,
    itemPath: readonly (string | number)[],
    catalogs: CompletionCatalogs
  ) => boolean
  getItemPickerLevels?: (
    completions: readonly CharacterCompletion[],
    currentPath: readonly (string | number)[]
  ) => ItemPickerLevel | null
  getItemProgress?: (
    completion: CharacterCompletion | null,
    itemPath: readonly (string | number)[],
    catalogs: CompletionCatalogs
  ) => ItemProgress | undefined
  getLeafDetailProgress?: (
    completion: CharacterCompletion | null,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
}

export interface AccountCheckerInput {
  account: AccountCompletion | null
  rows: readonly CompletionCharacterRow[]
  catalogs: CompletionCatalogs
}

export interface AccountCompletionCardChecker {
  isCardComplete: (input: AccountCheckerInput) => boolean
  isItemComplete?: (input: AccountCheckerInput, itemPath: readonly (string | number)[]) => boolean
  getItemPickerLevels?: (currentPath: readonly (string | number)[]) => ItemPickerLevel | null
  getItemProgress?: (
    input: AccountCheckerInput,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
  getLeafDetailProgress?: (
    input: AccountCheckerInput,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
}
