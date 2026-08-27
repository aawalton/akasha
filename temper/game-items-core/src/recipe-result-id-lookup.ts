import { recipeData } from "@temper/game-completion/generated/recipe-data.generated"

const recipeNameToResultId: ReadonlyMap<string, number> = new Map(
  recipeData.flatMap((list) => list.recipes.map((recipe) => [recipe.name, recipe.itemId] as const))
)

export function getRecipeResultId(itemName: string): number | undefined {
  const colonIndex = itemName.indexOf(": ")
  if (colonIndex === -1) return undefined
  const bareName = itemName.slice(colonIndex + 2)
  return recipeNameToResultId.get(bareName)
}
