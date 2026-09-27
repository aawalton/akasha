import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  completionCardTitle,
  completionMost,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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
  const title = completionCardTitle("account", "champion-points")
  const items: CompletionNode[] = [
    {
      key: "champion-points",
      label: title,
      count: championPointsEarned,
      total: completionMost("champion-points"),
    },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title={title}
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
