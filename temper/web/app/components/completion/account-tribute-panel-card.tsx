import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountTributeProgress } from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

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
