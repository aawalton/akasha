import { registerCatalogDomain } from "@temper/catalog-core/registry"
import { getSavedVariables } from "@temper/catalog-core/saved-variables-accessor"
import type {
  RecipeCatalogList,
  RecipeCatalogRecipe,
} from "@akasha/temper-capture-shapes/recipe-catalog"
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
