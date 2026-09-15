import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "akasha/temper/player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  computeOverallCompletionScore,
  sumAccountScope,
  sumCharacterScope,
  sumCompanionScope,
} from "akasha/temper/player-completion/modules/completion-scope-rollup/completion-scope-rollup.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "akasha/temper/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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

  if (account.total + characters.total + companions.total > 0) {
    items.push({
      key: "summary",
      label: "Items Completed",
      value: computeOverallCompletionScore(accountSummary, characterSummary, companionSummary),
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
