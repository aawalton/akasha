import type { SortDirection } from "@akasha/design-patterns/sort-types"
import {
  COMPANION_CARDS,
  type CompanionSummaryData,
} from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface CompanionsSummaryPanelCardProps {
  summary: CompanionSummaryData
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
  onItemClick?: (key: string) => void
  collapseProtected?: boolean
}

export function CompanionsSummaryPanelCard({
  summary,
  completionFilter,
  sortMode,
  sortDirection,
  onItemClick,
  collapseProtected,
}: CompanionsSummaryPanelCardProps) {
  const hasData = Object.values(summary).some((entry) => entry.total > 0)
  if (!hasData) return null

  const items: CompletionNode[] = COMPANION_CARDS.map((card) => ({
    key: card.id,
    label: card.title,
    count: summary[card.id].count,
    total: summary[card.id].total,
  }))

  return (
    <CompletionPanelCard
      title="Companions Summary"
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
      onItemClick={onItemClick}
      collapseProtected={collapseProtected}
    />
  )
}
