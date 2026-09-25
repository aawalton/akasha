import { RECIPE_DATA } from "akasha/temper/player/completion/modules/recipe-data/recipe-data.data-table.code.ts"
import type { CompletionCharacterRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "akasha/temper/player/completion/temper-player-completion/modules/completion-measured/completion-measured.module.code.ts"
import type {
  CharacterRecipeProgress,
  RecipeListProgressEntry,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"

export function transformRecipeProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterRecipeProgress[] {
  const result: CharacterRecipeProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const knownItemIds = new Set(Object.values(completion.recipes ?? {}).flat())

    const entries: RecipeListProgressEntry[] = []
    for (const list of RECIPE_DATA) {
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
