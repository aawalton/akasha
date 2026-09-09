import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { MAX_CHAMPION_POINTS } from "akasha/temper/champion-points/champion-point-source/champion-point-source.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/temper-player-completion/activity-categories/activity-categories.module.code.ts"
import type { AccountCardId } from "akasha/temper/temper-player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/temper-player-completion-ui/completion-panel-card/completion-panel-card.module.code.tsx"

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
