import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "akasha/temper/temper-player-completion/activity-categories/activity-categories.module.code.ts"
import type { AccountPoiUnionProgress } from "akasha/temper/temper-player-completion/completion-account-zone-poi-union/completion-account-zone-poi-union.module.code.ts"
import type { AccountCardId } from "akasha/temper/temper-player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/temper-player-completion-ui/completion-panel-card/completion-panel-card.module.code.tsx"

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
