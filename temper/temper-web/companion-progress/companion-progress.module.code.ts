import type { AccountQuestUnionProgress } from "@akasha/temper-player-completion/completion-account-union-progress"
import { transformCompanionQuestUnion } from "@akasha/temper-player-completion/completion-account-union-progress"
import type { CompanionSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import {
  transformCharacterCompanionRapport,
  transformCompanionProgress,
} from "@akasha/temper-player-completion/completion-companion-progress"
import { transformCompanionQuestProgress } from "@akasha/temper-player-completion/completion-quest-progress"
import { buildCompanionSummary } from "@akasha/temper-player-completion/completion-summary-companion"
import type {
  CharacterCompanionRapportProgress,
  CharacterQuestProgress,
  CompanionProgressEntry,
  CompanionSkillLineProgress,
} from "@akasha/temper-player-completion/completion-ui-types"
import type {
  useCompletionCharacters,
  useCompletionCompanions,
} from "@akasha/temper-player-completion-ui/use-completion"
import { useMemo } from "react"

export interface CompanionProgressData {
  companionProgress: readonly CompanionProgressEntry[]
  companionSkillLineProgress: readonly CompanionSkillLineProgress[]
  companionQuestUnion: AccountQuestUnionProgress
}

interface UseCompanionProgressArgs {
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  companionRows: ReturnType<typeof useCompletionCompanions>["companions"]
}

export interface UseCompanionProgressResult {
  companionProgressData: CompanionProgressData
  companionSummary: CompanionSummaryData
  companionQuestProgress: readonly CharacterQuestProgress[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
}

export function useCompanionProgress({
  rows,
  companionRows,
}: UseCompanionProgressArgs): UseCompanionProgressResult {
  const companionQuestProgress = useMemo(() => transformCompanionQuestProgress(rows), [rows])
  const companionQuestUnion = useMemo(
    () => transformCompanionQuestUnion(companionQuestProgress),
    [companionQuestProgress]
  )
  const { companionProgress, companionSkillLineProgress } = useMemo(
    () =>
      transformCompanionProgress(
        companionRows.map((r) => ({
          companionId: r.companionId,
          completion: r.completion,
        })),
        rows.map((r) => ({
          completion: r.completion,
        }))
      ),
    [companionRows, rows]
  )
  const companionRapportProgress = useMemo(
    () =>
      transformCharacterCompanionRapport(
        rows.map((r) => ({
          id: r.id,
          completion: r.completion,
        }))
      ),
    [rows]
  )
  const companionSummary = useMemo(
    () => buildCompanionSummary(companionProgress, companionSkillLineProgress, companionQuestUnion),
    [companionProgress, companionSkillLineProgress, companionQuestUnion]
  )

  const companionProgressData: CompanionProgressData = {
    companionProgress,
    companionSkillLineProgress,
    companionQuestUnion,
  }

  return {
    companionProgressData,
    companionSummary,
    companionQuestProgress,
    companionRapportProgress,
  }
}
