import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  computeOverallCompletionScore,
  sumAccountScope,
  sumCharacterScope,
  sumCompanionScope,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-scope-rollup/completion-scope-rollup.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { overallSummaryPanelCardAccount } from "akasha/temper/web/phrase/pages/overall-summary-panel-card-account.temper-web-phrase.ts"
import { overallSummaryPanelCardCharacters } from "akasha/temper/web/phrase/pages/overall-summary-panel-card-characters.temper-web-phrase.ts"
import { overallSummaryPanelCardCompanions } from "akasha/temper/web/phrase/pages/overall-summary-panel-card-companions.temper-web-phrase.ts"
import { overallSummaryPanelCardItemsCompleted } from "akasha/temper/web/phrase/pages/overall-summary-panel-card-items-completed.temper-web-phrase.ts"
import { overallSummaryPanelCardTitle } from "akasha/temper/web/phrase/pages/overall-summary-panel-card-title.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface OverallSummaryPanelCardProps {
  accountSummary: AccountSummaryData
  characterSummary: CharacterSummaryData
  companionSummary: CompanionSummaryData
  title?: React.ReactNode
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
  onItemClick?: (key: string) => void
  collapseProtected?: boolean
  subdued?: boolean
}

export function overallSummaryItems(
  accountSummary: AccountSummaryData,
  characterSummary: CharacterSummaryData,
  companionSummary: CompanionSummaryData,
  phrase: Phrase
): CompletionNode[] {
  const account = sumAccountScope(accountSummary)
  const characters = sumCharacterScope(characterSummary)
  const companions = sumCompanionScope(companionSummary)

  const items: CompletionNode[] = [
    {
      key: "account",
      label: phrase(overallSummaryPanelCardAccount.slug),
      count: account.count,
      total: account.total,
    },
    {
      key: "characters",
      label: phrase(overallSummaryPanelCardCharacters.slug),
      count: characters.count,
      total: characters.total,
    },
  ]

  if (companions.total > 0) {
    items.push({
      key: "companions",
      label: phrase(overallSummaryPanelCardCompanions.slug),
      count: companions.count,
      total: companions.total,
    })
  }

  if (account.total + characters.total + companions.total > 0) {
    items.push({
      key: "summary",
      label: phrase(overallSummaryPanelCardItemsCompleted.slug),
      value: computeOverallCompletionScore(accountSummary, characterSummary, companionSummary),
    })
  }

  return items
}

export function OverallSummaryPanelCard({
  accountSummary,
  characterSummary,
  companionSummary,
  title,
  completionFilter,
  sortMode,
  sortDirection,
  onItemClick,
  collapseProtected,
  subdued,
}: OverallSummaryPanelCardProps) {
  const phrase = usePhrase()
  const items = overallSummaryItems(accountSummary, characterSummary, companionSummary, phrase)

  return (
    <CompletionPanelCard
      title={title ?? phrase(overallSummaryPanelCardTitle.slug)}
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
      onItemClick={onItemClick}
      collapseProtected={collapseProtected}
      subdued={subdued}
    />
  )
}
