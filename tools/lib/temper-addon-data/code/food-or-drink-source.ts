import { codeModuleSync } from "../../code-import.ts"

type FoodOrDrinkSourceEntry = { readonly id: string; readonly name: string; readonly itemId: number; readonly abilityId: number; readonly icon: string; readonly seconds: number; readonly description: string; readonly level: string; readonly categoryId: string; readonly subcategoryId: string; readonly effects: readonly { readonly metricId: unknown; readonly effectType: unknown; readonly effectValue: unknown }[] }

type FoodOrDrinkSourceEntry1 = { readonly id: string; readonly name: string; readonly itemId: number; readonly abilityId: number; readonly icon: string; readonly seconds: number; readonly description: string; readonly level: string; readonly categoryId: string; readonly subcategoryId: string; readonly effects: readonly unknown[] }

const held = codeModuleSync<{
  foodOrDrink: { readonly data: Record<string, FoodOrDrinkSourceEntry | FoodOrDrinkSourceEntry1>; readonly ids: readonly string[]; readonly list: readonly (FoodOrDrinkSourceEntry | FoodOrDrinkSourceEntry1)[] }
}>("@temper/game-characters-character/food-and-drink/food-or-drink-source")

export const foodOrDrink = held.foodOrDrink
