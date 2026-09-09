import "akasha/temper/temper-eso-types/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"

import type {
  RecipeCatalogList,
  RecipeCatalogRecipe,
} from "akasha/temper/capture-shapes/recipe-catalog/recipe-catalog.module.code.ts"
import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

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
