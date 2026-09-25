import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { grandMasterStationNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionFilter,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface GrandMasterStationsPanelCardProps {
  id?: AccountCardId
  grandMasterStations?: Record<number, { name: string; unlocked: number[] }>
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function GrandMasterStationsPanelCard({
  id,
  grandMasterStations,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: GrandMasterStationsPanelCardProps) {
  return (
    <CompletionPanelCard
      id={id}
      title="Grand Master Crafting Stations"
      items={withActivityCategories(grandMasterStationNodes(grandMasterStations), "crafting")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
