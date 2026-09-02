import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"

export interface ItemPickerLevel {
  label: string
  options: readonly { value: string | number; label: string }[]
}

export interface ItemProgress {
  current: number
  total: number
}

export interface CompletionCardChecker {
  isCardComplete: (completion: CharacterCompletion | null) => boolean
  isItemComplete?: (
    completion: CharacterCompletion | null,
    itemPath: readonly (string | number)[]
  ) => boolean
  getItemPickerLevels?: (
    completions: readonly CharacterCompletion[],
    currentPath: readonly (string | number)[]
  ) => ItemPickerLevel | null
  getItemProgress?: (
    completion: CharacterCompletion | null,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
  getLeafDetailProgress?: (
    completion: CharacterCompletion | null,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
}

export interface AccountCompletionCardChecker {
  isCardComplete: (completion: AccountCompletion | null) => boolean
  isItemComplete?: (
    completion: AccountCompletion | null,
    itemPath: readonly (string | number)[]
  ) => boolean
  getItemPickerLevels?: (currentPath: readonly (string | number)[]) => ItemPickerLevel | null
  getItemProgress?: (
    completion: AccountCompletion | null,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
  getLeafDetailProgress?: (
    completion: AccountCompletion | null,
    itemPath: readonly (string | number)[]
  ) => ItemProgress | undefined
}
