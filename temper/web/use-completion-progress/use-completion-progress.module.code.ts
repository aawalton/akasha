import { useUserId } from "@akasha/pages-ui/use-user-id"
import type { BadgeToggleGroupItem } from "akasha/design/badges/badge-toggle-group/badge-toggle-group.module.code.tsx"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "akasha/temper/completion/completion-progress/completion-progress.module.code.ts"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "akasha/temper/player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import {
  useAccountCompletion,
  useAccountCompletionByUser,
  useCompletionCharacters,
  useCompletionCharactersByUser,
  useCompletionCompanions,
  useCompletionCompanionsByUser,
} from "akasha/temper/player-completion-ui/use-completion/use-completion.module.code.ts"
import { useMemo } from "react"
import type { AccountProgressData } from "../account-progress/account-progress.module.code.ts"
import { useAccountProgress } from "../account-progress/account-progress.module.code.ts"
import type { CharacterProgressData } from "../character-progress/character-progress.module.code.ts"
import { useCharacterProgress } from "../character-progress/character-progress.module.code.ts"
import type { CompanionProgressData } from "../companion-progress/companion-progress.module.code.ts"
import { useCompanionProgress } from "../companion-progress/companion-progress.module.code.ts"
import { useCompletionBodies } from "../use-completion-bodies/use-completion-bodies.module.code.ts"
import { useCompletionCatalogs } from "../use-completion-catalogs/use-completion-catalogs.module.code.ts"

const CHARACTER_TYPE = "temper-account-character"
const COMPANION_TYPE = "temper-companion-progress"
const ACCOUNT_TYPE = "temper-account"
const OWNER_KEY = "accountPage"
const ACCOUNT_OWNER_KEY = "title"

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

  const ownUserId = useUserId()
  const readerId = viewUserId ?? ownUserId
  const characterBodies = useCompletionBodies(CHARACTER_TYPE, OWNER_KEY, readerId)
  const companionBodies = useCompletionBodies(COMPANION_TYPE, OWNER_KEY, readerId)
  const accountBodies = useCompletionBodies(ACCOUNT_TYPE, ACCOUNT_OWNER_KEY, readerId)

  const { characters: bareRows } = viewUserId != null ? viewCharacters : ownCharacters
  const { companions: bareCompanionRows } = viewUserId != null ? viewCompanions : ownCompanions

  const rows = useMemo(
    () =>
      bareRows.map((row) => ({
        ...row,
        completion: (characterBodies.bodies.get(row.id) as CharacterCompletion | undefined) ?? null,
      })),
    [bareRows, characterBodies.bodies]
  )
  const companionRows = useMemo(
    () =>
      bareCompanionRows.map((row) => ({
        ...row,
        completion: (companionBodies.bodies.get(row.id) as CompanionCompletion | undefined) ?? null,
      })),
    [bareCompanionRows, companionBodies.bodies]
  )
  const accountCompletion = useMemo(() => {
    for (const body of accountBodies.bodies.values()) return body as AccountCompletion
    return null
  }, [accountBodies.bodies])

  const isLoading =
    catalogsLoading ||
    characterBodies.isLoading ||
    companionBodies.isLoading ||
    accountBodies.isLoading ||
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
