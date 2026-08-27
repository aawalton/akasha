import type { CharacterCompletion } from "@temper/game-completion/completion-types"

export interface CompletionCharacterRow {
  id: string
  userId: string
  esoCharacterId: string
  title?: string | null | undefined
  completion?: CharacterCompletion | null | undefined
  createdAt: number
  updatedAt: number
  liveBuildId?: string | null | undefined
  targetBuildId?: string | null | undefined
  roles: readonly string[]
  sortOrder?: number | null | undefined
}
