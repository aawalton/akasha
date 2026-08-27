import type { RecipeList } from "@temper/game-completion/completion-types"
import { recipeData } from "@temper/game-completion/generated/recipe-data.generated"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type { CharacterRecipeProgress, RecipeListProgressEntry } from "./completion-ui-types"

function isExhaustiveRecipeList(value: unknown): value is RecipeList {
  return typeof value === "object" && value !== null && "name" in value
}

export function transformRecipeProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterRecipeProgress[] {
  const result: CharacterRecipeProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const knownItemIds = new Set<number>()
    if (completion.recipes) {
      for (const listValue of Object.values(completion.recipes)) {
        if (isExhaustiveRecipeList(listValue)) {
          for (const [itemIdStr, recipe] of Object.entries(listValue.recipes)) {
            if (recipe.known) knownItemIds.add(Number(itemIdStr))
          }
        } else if (Array.isArray(listValue)) {
          for (const itemId of listValue) knownItemIds.add(itemId)
        } else if (typeof listValue === "object" && listValue !== null) {
          for (const itemId of Object.values(listValue)) {
            if (typeof itemId === "number") knownItemIds.add(itemId)
          }
        }
      }
    }

    const entries: RecipeListProgressEntry[] = []
    for (const list of recipeData) {
      let knownCount = 0
      const recipes = list.recipes.map((r) => {
        const known = knownItemIds.has(r.itemId)
        if (known) knownCount++
        return { itemId: r.itemId, name: r.name, known }
      })
      const totalCount = recipes.length
      entries.push({
        listIndex: list.listIndex,
        name: list.name,
        knownCount,
        totalCount,
        percent: totalCount > 0 ? (knownCount / totalCount) * 100 : 0,
        recipes,
      })
    }

    result.push({ characterId: row.id, entries })
  }

  return result
}
