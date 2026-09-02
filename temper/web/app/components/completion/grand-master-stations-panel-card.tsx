import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { TOTAL_GRAND_MASTER_STATIONS } from "@akasha/temper-completion/completion-progress"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

const FALLBACK_LABELS = ["Blacksmithing", "Clothier", "Jewelrycrafting", "Woodworking"]

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
  let items: CompletionNode[]

  if (grandMasterStations && Object.keys(grandMasterStations).length > 0) {
    items = Object.entries(grandMasterStations)
      .map(([key, entry]) => {
        const raw = entry.unlocked
        const count = Array.isArray(raw)
          ? raw.length
          : typeof raw === "object" && raw !== null
            ? Object.keys(raw).length
            : 0
        return {
          key,
          label: entry.name,
          count,
          total: TOTAL_GRAND_MASTER_STATIONS,
        } satisfies CompletionNode
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  } else {
    items = FALLBACK_LABELS.map((label) => ({
      key: label,
      label,
      count: 0,
      total: TOTAL_GRAND_MASTER_STATIONS,
    }))
  }

  return (
    <CompletionPanelCard
      id={id}
      title="Grand Master Crafting Stations"
      items={withActivityCategories(items, "crafting")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
