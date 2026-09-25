import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"

export interface CompletionCharacterRow {
  id: string
  esoCharacterId: string
  title?: string | null | undefined
  completion?: CharacterCompletion | null | undefined
}
