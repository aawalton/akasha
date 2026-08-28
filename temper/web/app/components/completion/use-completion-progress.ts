import type { BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { useAccountCompletion, useAccountCompletionByUser, useCompletionCharacters, useCompletionCharactersByUser, useCompletionCompanions, useCompletionCompanionsByUser } from "@temper/player-completion-ui/use-completion"
import type { AccountSummaryData, CharacterSummaryData, CompanionSummaryData } from "@temper/player-completion/completion-card-registry"
import type { AccountProgressData } from "@/components/completion/completion-progress/account-progress"
import { useAccountProgress } from "@/components/completion/completion-progress/account-progress"
import type { CharacterProgressData } from "@/components/completion/completion-progress/character-progress"
import { useCharacterProgress } from "@/components/completion/completion-progress/character-progress"
import type { CompanionProgressData } from "@/components/completion/completion-progress/companion-progress"
import { useCompanionProgress } from "@/components/completion/completion-progress/companion-progress"

interface CompletionProgressData {
  accountProgress: AccountProgressData
  characterProgress: CharacterProgressData
  companionProgressData: CompanionProgressData
  accountSummary: AccountSummaryData
  characterSummary: CharacterSummaryData
  companionSummary: CompanionSummaryData
  characterItems: readonly BadgeToggleGroupItem[]
  account: ReturnType<typeof useAccountCompletion>["account"]
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  companionRows: ReturnType<typeof useCompletionCompanions>["companions"]
  isLoading: boolean
}

export function useCompletionProgress(viewUserId: string | undefined): CompletionProgressData {
  const ownCharacters = useCompletionCharacters()
  const ownCompanions = useCompletionCompanions()
  const ownAccount = useAccountCompletion()
  const viewCharacters = useCompletionCharactersByUser(viewUserId ?? "")
  const viewCompanions = useCompletionCompanionsByUser(viewUserId ?? "")
  const viewAccount = useAccountCompletionByUser(viewUserId ?? "")

  const { characters: rows } = viewUserId != null ? viewCharacters : ownCharacters
  const { companions: companionRows } = viewUserId != null ? viewCompanions : ownCompanions
  const { account: accountCompletion } = viewUserId != null ? viewAccount : ownAccount
  const isLoading =
    (viewUserId != null ? viewCharacters : ownCharacters).isLoading ||
    (viewUserId != null ? viewCompanions : ownCompanions).isLoading ||
    (viewUserId != null ? viewAccount : ownAccount).isLoading

  const {
    companionProgressData,
    companionSummary,
    companionQuestProgress,
    companionRapportProgress,
  } = useCompanionProgress({ rows, companionRows })

  const { characterProgress, characterSummary, characterItems, loreProgress } =
    useCharacterProgress({
      rows,
      accountCompletion,
      companionQuestProgress,
      companionRapportProgress,
    })

  const { accountProgress, accountSummary } = useAccountProgress({
    rows,
    accountCompletion,
    characterProgress,
    loreProgress,
  })

  return {
    accountProgress,
    characterProgress,
    companionProgressData,
    accountSummary,
    characterSummary,
    companionSummary,
    characterItems,
    account: accountCompletion,
    rows,
    companionRows,
    isLoading,
  }
}
