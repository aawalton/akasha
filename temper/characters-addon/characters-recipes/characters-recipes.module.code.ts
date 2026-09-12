import { addIdToListAt } from "akasha/temper/characters-addon/characters-known-id-lists/characters-known-id-lists.module.code.ts"
import { mergeIdListsByKey } from "akasha/temper/characters-addon/modules/characters-collector-merge/characters-collector-merge.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/characters-addon/modules/characters-current-entry/characters-current-entry.module.code.ts"
import type { SparseRecipes } from "akasha/temper/completion/completion-progress/completion-progress.module.code.ts"

const RECIPE_TOTALS: Record<number, number> = {}

export function getRecipeTotals(): Record<number, number> {
  return RECIPE_TOTALS
}

function scanRecipes(): SparseRecipes {
  const recipes: SparseRecipes = {}

  for (let listIndex = 1; listIndex <= GetNumRecipeLists(); listIndex++) {
    const [name, numRecipes] = GetRecipeListInfo(listIndex)
    if (name === undefined || name === "") continue

    RECIPE_TOTALS[listIndex] = numRecipes

    const knownItemIds: number[] = []

    for (let recipeIndex = 1; recipeIndex <= numRecipes; recipeIndex++) {
      const [known, , , , , , , itemId] = GetRecipeInfo(listIndex, recipeIndex)
      if (known && itemId !== undefined && itemId > 0) {
        knownItemIds.push(itemId)
      }
    }

    if (knownItemIds.length > 0) {
      recipes[listIndex] = knownItemIds
    }
  }

  return recipes
}

export function collectRecipes(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.recipes = mergeIdListsByKey(charEntry.recipes, scanRecipes())
}

export function updateRecipe(listIndex: number, recipeIndex: number): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  const recipes = charEntry.recipes
  if (recipes === undefined) return

  const [known, , , , , , , itemId] = GetRecipeInfo(listIndex, recipeIndex)
  if (!known || itemId === undefined || itemId <= 0) return

  addIdToListAt(recipes, listIndex, itemId)
}

export function refreshAllRecipes(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.recipes = scanRecipes()
}
