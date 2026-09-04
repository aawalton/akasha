import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type {
  RecipeCatalogList,
  RecipeCatalogRecipe,
} from "@akasha/temper-capture-shapes/recipe-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export function collectRecipeCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, RecipeCatalogList> = {}

  for (let listIndex = 1; listIndex <= GetNumRecipeLists(); listIndex++) {
    const [rawName, numRecipes] = GetRecipeListInfo(listIndex)
    const name = zo_strformat("<<1>>", rawName)
    if (name === undefined || name === "") continue

    const recipes: Record<number, RecipeCatalogRecipe> = {}

    for (let recipeIndex = 1; recipeIndex <= numRecipes; recipeIndex++) {
      const [, recipeName, , , , , , itemId] = GetRecipeInfo(listIndex, recipeIndex)
      if (itemId === undefined || itemId <= 0) continue
      if (recipeName === undefined || recipeName === "") continue

      recipes[itemId] = { name: zo_strformat("<<1>>", recipeName) }
    }

    if (Object.keys(recipes).length > 0) {
      catalog[listIndex] = { name, recipes }
    }
  }

  savedVars.recipeCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "recipeCatalog", collect: collectRecipeCatalog })
