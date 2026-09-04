import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type { AccountLoreProgress } from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface LoreLibraryPanelCardProps {
  id?: AccountCardId
  loreProgress: AccountLoreProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function LoreLibraryPanelCard({
  id,
  loreProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: LoreLibraryPanelCardProps) {
  const items: CompletionNode[] = loreProgress.categories.map((category) => ({
    key: String(category.categoryIndex),
    label: category.name,
    children: category.collections.map(
      (collection): CompletionNode => ({
        key: String(collection.collectionIndex),
        label: collection.name,
        children: collection.books.map(
          (book): CompletionNode => ({
            key: String(book.bookIndex),
            label: book.name,
            count: book.known ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Lore Library"
      items={withActivityCategories(items, "exploration")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
