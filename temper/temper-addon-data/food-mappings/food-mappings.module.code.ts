import { foodOrDrink } from "@akasha/temper-character-sources/food-or-drink-source"
export function generateFoodMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of foodOrDrink.ids.entries()) {
    const food = foodOrDrink.data[id]
    if (food === undefined) continue
    if (food.abilityId === 0) continue
    indexEntries.push(`  [${food.abilityId}]: ${i}, // ${food.name}`)
    temperIdEntries.push(`  [${food.abilityId}]: "${food.id}", // ${food.name}`)
  }

  return `\
/**
 * Food Mappings (Generated)
 *
 * Maps ESO food/drink buff ability IDs to temper indices and string IDs.
 * Source: engine/food-and-drink/food-or-drink-source.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const FOOD_ABILITY_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const FOOD_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getFoodIndex(abilityId: number): number {
  return FOOD_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}

export function getFoodTemperId(abilityId: number): string {
  return FOOD_ABILITY_ID_TO_TEMPER_ID[abilityId] ?? "no-food-or-drink"
}
`
}
