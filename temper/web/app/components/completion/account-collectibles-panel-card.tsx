import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { COLLECTIBLE_CATEGORY_TO_ACTIVITY } from "@temper/player-completion/activity-categories"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountCollectiblesProgress } from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface AccountCollectiblesPanelCardProps {
  id?: AccountCardId
  collectiblesProgress: AccountCollectiblesProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountCollectiblesPanelCard({
  id,
  collectiblesProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountCollectiblesPanelCardProps) {
  const items: CompletionNode[] = collectiblesProgress.categories.map((category) => {
    const activity = COLLECTIBLE_CATEGORY_TO_ACTIVITY[category.categoryIndex] ?? "other"

    const onlySubCategory =
      category.subCategories.length === 1 ? category.subCategories[0] : undefined
    if (onlySubCategory) {
      return {
        key: String(category.categoryIndex),
        label: category.name,
        activityCategories: [activity],
        children: withActivityCategories(
          onlySubCategory.collectibles.map(
            (c): CompletionNode => ({
              key: String(c.id),
              label: c.name,
              count: c.unlocked ? 1 : 0,
              total: 1,
            })
          ),
          activity
        ),
      }
    }

    return {
      key: String(category.categoryIndex),
      label: category.name,
      activityCategories: [activity],
      children: withActivityCategories(
        category.subCategories.map(
          (sub): CompletionNode => ({
            key: sub.name,
            label: sub.name,
            children: sub.collectibles.map(
              (c): CompletionNode => ({
                key: String(c.id),
                label: c.name,
                count: c.unlocked ? 1 : 0,
                total: 1,
              })
            ),
          })
        ),
        activity
      ),
    }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Collectibles"
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
