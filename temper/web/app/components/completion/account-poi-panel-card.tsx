import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountPoiUnionProgress } from "@temper/player-completion/completion-account-zone-poi-union"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface AccountPoiPanelCardProps {
  id?: AccountCardId
  poiUnion: AccountPoiUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountPoiPanelCard({
  id,
  poiUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountPoiPanelCardProps) {
  const items: CompletionNode[] = poiUnion.zones.map((zone) => ({
    key: String(zone.zoneId),
    label: zone.name,
    children: zone.poiTypes.map(
      (pt): CompletionNode => ({
        key: `${zone.zoneId}-${pt.poiType}`,
        label: pt.label,
        children: pt.pois.map(
          (poi): CompletionNode => ({
            key: String(poi.poiIndex),
            label: poi.name,
            count: poi.discovered ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Points of Interest"
      items={withActivityCategories(items, "exploration")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
