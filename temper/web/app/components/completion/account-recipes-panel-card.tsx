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
import type { AccountRecipeUnionProgress } from "@temper/player-completion/completion-account-recipe-scribing-union"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface AccountRecipesPanelCardProps {
  id?: AccountCardId
  recipeUnion: AccountRecipeUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountRecipesPanelCard({
  id,
  recipeUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountRecipesPanelCardProps) {
  const items: CompletionNode[] = recipeUnion.entries.map((entry) => ({
    key: String(entry.listIndex),
    label: entry.name,
    children: entry.recipes.map(
      (recipe): CompletionNode => ({
        key: String(recipe.itemId),
        label: recipe.name,
        count: recipe.known ? 1 : 0,
        total: 1,
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Crafting Recipes"
      items={withActivityCategories(items, "crafting")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
