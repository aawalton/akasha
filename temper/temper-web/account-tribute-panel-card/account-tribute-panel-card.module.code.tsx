import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type { AccountTributeProgress } from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface AccountTributePanelCardProps {
  id?: AccountCardId
  tributeProgress: AccountTributeProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountTributePanelCard({
  id,
  tributeProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountTributePanelCardProps) {
  const items: CompletionNode[] = tributeProgress.patrons.map((patron) => {
    const children: CompletionNode[] = [
      {
        key: `${patron.patronId}-unlock`,
        label: "Patron Unlocked",
        count: patron.unlocked ? 1 : 0,
        total: 1,
      },
      ...patron.cards.map(
        (card): CompletionNode => ({
          key: `${patron.patronId}-${card.cardIndex}`,
          label: `${card.baseCardName} \u2192 ${card.upgradeCardName}`,
          count: card.upgraded ? 1 : 0,
          total: 1,
        })
      ),
    ]

    return {
      key: String(patron.patronId),
      label: patron.name,
      children,
    }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Tales of Tribute"
      items={withActivityCategories(items, "other")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
