import type { SparseRecipes } from "@temper/game-completion/completion-types"
import { getSavedVariables } from "../saved-variables"
import { mergeIdListsByKey } from "./collector-merge"

export const recipeTotals: Record<number, number> = {}

export function getRecipeTotals(): Record<number, number> {
  return recipeTotals
}

export function scanRecipes(): SparseRecipes {
  const recipes: SparseRecipes = {}

  for (let listIndex = 1; listIndex <= GetNumRecipeLists(); listIndex++) {
    const [name, numRecipes] = GetRecipeListInfo(listIndex)
    if (name === undefined || name === "") continue

    recipeTotals[listIndex] = numRecipes

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
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.recipes = mergeIdListsByKey(charEntry.recipes, scanRecipes())
}

export function updateRecipe(listIndex: number, recipeIndex: number): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  const recipes = charEntry.recipes
  if (recipes === undefined) return

  const [known, , , , , , , itemId] = GetRecipeInfo(listIndex, recipeIndex)
  if (!known || itemId === undefined || itemId <= 0) return

  let list = recipes[listIndex]
  if (list === undefined) {
    list = []
    recipes[listIndex] = list
  }

  for (const id of list) {
    if (id === itemId) return
  }
  list.push(itemId)
}

export function refreshAllRecipes(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.recipes = scanRecipes()
}
