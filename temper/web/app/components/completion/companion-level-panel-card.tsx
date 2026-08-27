import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { CompanionProgressEntry } from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CompanionCardId } from "@temper/player-completion/completion-card-registry"

interface CompanionLevelPanelCardProps {
  id?: CompanionCardId
  companionProgress: readonly CompanionProgressEntry[]
  selectedCompanionIds: readonly string[]
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionLevelPanelCard({
  id,
  companionProgress,
  selectedCompanionIds,
  completionFilter,
  sortMode,
  sortDirection,
}: CompanionLevelPanelCardProps) {
  const isAggregate = selectedCompanionIds.length === 0
  const filtered = isAggregate
    ? companionProgress
    : companionProgress.filter((c) => selectedCompanionIds.includes(c.companionId))

  const companionNodes: CompletionNode[] = filtered.flatMap((c) =>
    c.level === undefined
      ? []
      : [{ key: c.companionId, label: c.name, count: c.level, total: c.maxLevel }]
  )

  const items: CompletionNode[] = [{ key: "level", label: "Level", children: companionNodes }]

  return (
    <CompletionPanelCard
      id={id}
      title="Companion Level"
      items={withActivityCategories(items, "companions")}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
