import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "@akasha/temper-player-completion/completion-card-registry"
import {
  useAccountCompletion,
  useAccountCompletionByUser,
  useCompletionCharacters,
  useCompletionCharactersByUser,
  useCompletionCompanions,
  useCompletionCompanionsByUser,
} from "@akasha/temper-player-completion-ui/use-completion"
import type { AccountProgressData } from "@/components/completion/completion-progress/account-progress"
import { useAccountProgress } from "@/components/completion/completion-progress/account-progress"
import type { CharacterProgressData } from "@/components/completion/completion-progress/character-progress"
import { useCharacterProgress } from "@/components/completion/completion-progress/character-progress"
import type { CompanionProgressData } from "@/components/completion/completion-progress/companion-progress"
import { useCompanionProgress } from "@/components/completion/completion-progress/companion-progress"
import { useCompletionCatalogs } from "@/components/completion/use-completion-catalogs"

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
  const { catalogs, isLoading: catalogsLoading } = useCompletionCatalogs()

  const { characters: rows } = viewUserId != null ? viewCharacters : ownCharacters
  const { companions: companionRows } = viewUserId != null ? viewCompanions : ownCompanions
  const { account: accountCompletion } = viewUserId != null ? viewAccount : ownAccount
  // The catalogs have to be part of this, not just the player's own rows. Every transform below
  // returns zeros against an empty catalog rather than throwing, so a caller that rendered before
  // they landed would show a real-looking 0% for a beat and then correct itself.
  const isLoading =
    catalogsLoading ||
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
      catalogs,
    })

  const { accountProgress, accountSummary } = useAccountProgress({
    rows,
    accountCompletion,
    characterProgress,
    loreProgress,
    catalogs,
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
