
import { recipeCatalogSchema } from "@temper/game-crafting-capture-host/saved-variables-schema"
import { CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

type ListMap = Map<number, { name: string; recipes: Map<number, string> }>

function stripEsoMarkers(name: string): string {
  return name.replace(/\^[A-Za-z]+$/, "")
}

function extractRecipesFromSavedVars(accountWide: Record<string, unknown>): ListMap {
  const rawRecipeCatalog = accountWide.recipeCatalog
  if (!rawRecipeCatalog)
    throw dataError(
      "No recipeCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const recipeCatalog = recipeCatalogSchema.parse(rawRecipeCatalog)

  const listMap: ListMap = new Map()

  for (const [listIdxStr, recipeList] of Object.entries(recipeCatalog)) {
    const listIdx = Number(listIdxStr)

    const recipes = new Map<number, string>()

    for (const [itemIdStr, recipe] of Object.entries(recipeList.recipes)) {
      const itemId = Number(itemIdStr)
      if (itemId === 0) continue

      recipes.set(itemId, stripEsoMarkers(recipe.name))
    }

    if (recipes.size > 0) {
      listMap.set(listIdx, { name: recipeList.name, recipes })
    }
  }

  return listMap
}

function generateDataFile(
  listMap: Map<number, { name: string; recipes: Map<number, string> }>,
  apiVersion: string
): string {
  const sortedLists = [...listMap.entries()].sort((a, b) => a[0] - b[0])

  let totalRecipes = 0

  const listLines: string[] = []

  for (const [listIdx, list] of sortedLists) {
    const sortedRecipes = [...list.recipes.entries()].sort((a, b) => a[0] - b[0])
    if (sortedRecipes.length === 0) continue

    totalRecipes += sortedRecipes.length

    const recipeLines = sortedRecipes.map(
      ([itemId, name]) => `      { itemId: ${itemId}, name: ${JSON.stringify(name)} }`
    )

    listLines.push(
      `  { listIndex: ${listIdx}, name: ${JSON.stringify(list.name)}, recipes: [\n${recipeLines.join(",\n")}\n  ]}`
    )
  }

  return `\
/**
 * Crafting Recipe Static Data (Generated)
 *
 * ${sortedLists.length} recipe lists, ${totalRecipes} recipes
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate recipe
 */

interface RecipeEntry {
  itemId: number
  name: string
}

interface RecipeListEntry {
  listIndex: number
  name: string
  recipes: readonly RecipeEntry[]
}

export const recipeData: RecipeListEntry[] = [
${listLines.join(",\n")}
]
`
}

export const tier: Tier = {
  slug: "recipe",
  summary: "Crafting recipes, by recipe list",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/game-completion/src/generated/recipe-data.generated.ts",
  format: false,
  emit: (accountWide, apiVersion): TierEmit => {
    const listMap = extractRecipesFromSavedVars(accountWide)

    return {
      content: generateDataFile(listMap, apiVersion),
      report: [`Found ${listMap.size} recipe lists (apiVersion: ${apiVersion})`],
    }
  },
}
