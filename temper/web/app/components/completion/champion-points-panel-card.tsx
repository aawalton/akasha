import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { MAX_CHAMPION_POINTS } from "@akasha/temper-champion-points/champion-point-source"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface ChampionPointsPanelCardProps {
  id?: AccountCardId
  championPointsEarned: number
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function ChampionPointsPanelCard({
  id,
  championPointsEarned,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: ChampionPointsPanelCardProps) {
  const items: CompletionNode[] = [
    {
      key: "champion-points",
      label: "Champion Points",
      count: championPointsEarned,
      total: MAX_CHAMPION_POINTS,
    },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title="Champion Points"
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
