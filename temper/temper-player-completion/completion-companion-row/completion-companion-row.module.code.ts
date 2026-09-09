import type { CompanionCompletion } from "akasha/temper/completion/completion-progress/completion-progress.module.code.ts"

export interface CompletionCompanionRow {
  id: string
  accountPage: string | null
  companionId: string
  completion: CompanionCompletion | null
  sortOrder: number | undefined
  roles: readonly string[]
  liveBuildId: string | undefined
  targetBuildId: string | undefined
  createdAt: number
  updatedAt: number
}
