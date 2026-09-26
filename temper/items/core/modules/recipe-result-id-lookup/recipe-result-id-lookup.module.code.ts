import { recipeCatalog } from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-catalog/recipe-list-catalog.module.code.ts"

export function getRecipeResultId(itemName: string): number | undefined {
  const colonIndex = itemName.indexOf(": ")
  if (colonIndex === -1) return undefined
  const bareName = itemName.slice(colonIndex + 2)
  return recipeCatalog().resultByName.get(bareName)
}
