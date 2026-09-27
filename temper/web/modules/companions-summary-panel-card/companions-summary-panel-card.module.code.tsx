import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import {
  COMPANION_CARDS,
  type CompanionSummaryData,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionsSummaryPanelCardTitle } from "akasha/temper/web/phrase/pages/companions-summary-panel-card-title.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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
  const phrase = usePhrase()
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
      title={phrase(companionsSummaryPanelCardTitle.slug)}
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
      onItemClick={onItemClick}
      collapseProtected={collapseProtected}
    />
  )
}
