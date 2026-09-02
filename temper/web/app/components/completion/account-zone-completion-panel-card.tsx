import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountZoneCompletionUnionProgress } from "@akasha/temper-player-completion/completion-account-zone-poi-union"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface AccountZoneCompletionPanelCardProps {
  id?: AccountCardId
  zoneCompletionUnion: AccountZoneCompletionUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountZoneCompletionPanelCard({
  id,
  zoneCompletionUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountZoneCompletionPanelCardProps) {
  const items: CompletionNode[] = zoneCompletionUnion.zones.map((zone) => ({
    key: String(zone.zoneId),
    label: zone.name,
    children: zone.completionTypes.map(
      (ct): CompletionNode => ({
        key: `${zone.zoneId}-${ct.completionType}`,
        label: ct.label,
        children: ct.activities.map(
          (activity): CompletionNode => ({
            key: String(activity.activityIndex),
            label: activity.name,
            count: activity.completed ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Zone Completion"
      items={withActivityCategories(items, "exploration")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
