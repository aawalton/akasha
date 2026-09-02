import type { SortDirection } from "@akasha/design-patterns/sort-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "@temper/player-completion/completion-card-registry"
import {
  sumAccountScope,
  sumCharacterScope,
  sumCompanionScope,
} from "@temper/player-completion/completion-overall-score"

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

export function OverallSummaryPanelCard({
  accountSummary,
  characterSummary,
  companionSummary,
  title = "Overall",
  completionFilter,
  sortMode,
  sortDirection,
  onItemClick,
  collapseProtected,
  subdued,
}: OverallSummaryPanelCardProps) {
  const account = sumAccountScope(accountSummary)
  const characters = sumCharacterScope(characterSummary)
  const companions = sumCompanionScope(companionSummary)

  const items: CompletionNode[] = [
    { key: "account", label: "Account", count: account.count, total: account.total },
    { key: "characters", label: "Characters", count: characters.count, total: characters.total },
  ]

  if (companions.total > 0) {
    items.push({
      key: "companions",
      label: "Companions",
      count: companions.count,
      total: companions.total,
    })
  }

  return (
    <CompletionPanelCard
      title={title}
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
