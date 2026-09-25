import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

export interface CompletionCharacterRow {
  id: string
  esoCharacterId: string
  title?: string | null | undefined
  completion?: CharacterCompletion | null | undefined
}
