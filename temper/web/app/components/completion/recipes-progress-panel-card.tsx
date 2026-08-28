import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { requireGet } from "@shared/utils-narrow/require-get"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterRecipeProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface RecipesProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  recipeProgress: readonly CharacterRecipeProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

interface AggregatedRecipe {
  itemId: number
  name: string
  count: number
  total: number
}

interface AggregatedRecipeList {
  listIndex: number
  name: string
  recipes: readonly AggregatedRecipe[]
}

function aggregateRecipeLists(
  progressEntries: readonly CharacterRecipeProgress[]
): readonly AggregatedRecipeList[] {
  const listMap = new Map<
    number,
    {
      name: string
      recipeMap: Map<number, { name: string; knownSum: number; count: number }>
    }
  >()
  const orderedIndices: number[] = []

  for (const cp of progressEntries) {
    for (const entry of cp.entries) {
      let agg = listMap.get(entry.listIndex)
      if (!agg) {
        agg = { name: entry.name, recipeMap: new Map() }
        listMap.set(entry.listIndex, agg)
        orderedIndices.push(entry.listIndex)
      }

      for (const recipe of entry.recipes) {
        let recipeAgg = agg.recipeMap.get(recipe.itemId)
        if (!recipeAgg) {
          recipeAgg = { name: recipe.name, knownSum: 0, count: 0 }
          agg.recipeMap.set(recipe.itemId, recipeAgg)
        }
        recipeAgg.count++
        if (recipe.known) recipeAgg.knownSum++
      }
    }
  }

  return orderedIndices.map((listIndex) => {
    const agg = requireGet(listMap, listIndex, "listMap")
    const recipes: AggregatedRecipe[] = []
    for (const [itemId, recipeAgg] of agg.recipeMap) {
      recipes.push({
        itemId,
        name: recipeAgg.name,
        count: recipeAgg.knownSum,
        total: recipeAgg.count,
      })
    }
    return { listIndex, name: agg.name, recipes }
  })
}

function buildRecipeKnownLookup(
  progressEntries: readonly CharacterRecipeProgress[]
): Map<string, Map<number, boolean>> {
  const lookup = new Map<string, Map<number, boolean>>()
  for (const cp of progressEntries) {
    const charMap = new Map<number, boolean>()
    for (const entry of cp.entries) {
      for (const recipe of entry.recipes) {
        charMap.set(recipe.itemId, recipe.known)
      }
    }
    lookup.set(cp.characterId, charMap)
  }
  return lookup
}

export function RecipesProgressPanelCard({
  id,
  characters,
  recipeProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: RecipesProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? recipeProgress
    : recipeProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const recipeLists = aggregateRecipeLists(selectedProgress)
    const knownLookup = buildRecipeKnownLookup(selectedProgress)
    const charNames = new Map(characters.map((c) => [c.id, c.name]))

    const items: CompletionNode[] = recipeLists.map((list) => ({
      key: String(list.listIndex),
      label: list.name,
      children: list.recipes.map(
        (recipe): CompletionNode => ({
          key: String(recipe.itemId),
          label: recipe.name,
          children: selectedProgress.map(
            (cp): CompletionNode => ({
              key: cp.characterId,
              label: charNames.get(cp.characterId) ?? cp.characterId,
              count: knownLookup.get(cp.characterId)?.get(recipe.itemId) ? 1 : 0,
              total: 1,
            })
          ),
        })
      ),
    }))

    const totalChildren: CompletionNode[] = selectedProgress.map((cp) => {
      let count = 0
      let total = 0
      for (const entry of cp.entries) {
        total += entry.recipes.length
        for (const r of entry.recipes) {
          if (r.known) count++
        }
      }
      return {
        key: cp.characterId,
        label: charNames.get(cp.characterId) ?? cp.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title="Crafting Recipes"
        items={withActivityCategories(items, "crafting")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const recipeLists =
    selectedProgress.length === 1
      ? requireFirst(selectedProgress).entries.map(
          (e): AggregatedRecipeList => ({
            listIndex: e.listIndex,
            name: e.name,
            recipes: e.recipes.map((r) => ({
              itemId: r.itemId,
              name: r.name,
              count: r.known ? 1 : 0,
              total: 1,
            })),
          })
        )
      : aggregateRecipeLists(selectedProgress)

  const items: CompletionNode[] = recipeLists.map((list) => ({
    key: String(list.listIndex),
    label: list.name,
    children: list.recipes.map(
      (recipe): CompletionNode => ({
        key: String(recipe.itemId),
        label: recipe.name,
        count: recipe.count,
        total: recipe.total,
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Crafting Recipes"
      items={withActivityCategories(items, "crafting")}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
