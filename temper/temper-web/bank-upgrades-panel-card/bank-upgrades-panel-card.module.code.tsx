import type { SortDirection } from "@akasha/design-patterns/sort-types"
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
