import type { SortDirection } from "@akasha/design-patterns/sort-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface BankUpgradesPanelCardProps {
  id?: AccountCardId
  bankUpgrade: { current: number; max: number }
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function BankUpgradesPanelCard({
  id,
  bankUpgrade,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: BankUpgradesPanelCardProps) {
  const items: CompletionNode[] = [
    {
      key: "bank-upgrades",
      label: "Bank Upgrades",
      count: bankUpgrade.current,
      total: bankUpgrade.max,
    },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title="Bank Upgrades"
      items={withActivityCategories(items, "other")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
