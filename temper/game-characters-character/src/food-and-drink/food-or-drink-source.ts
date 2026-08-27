import type { EffectSourceInterface } from "@temper/shared-formula-framework/effect-source"
import { createSourceFile } from "@temper/shared-formula-framework/utils/create-source-file"
import { drinks } from "./drink-source"
import { foods } from "./food-source"

export interface FoodOrDrinkTemplate extends EffectSourceInterface {
  categoryId: "food-or-drink"
  subcategoryId: "food" | "drink" | "none"
  name: string
  description: string
  itemId: number
  abilityId: number
  icon: string
  level: string
  seconds: number
}

const FOOD_OR_DRINK = {
  "no-food-or-drink": {
    id: "no-food-or-drink" as const,
    name: "No Food or Drink",
    itemId: 0,
    abilityId: 0,
    icon: "",
    seconds: 0,
    description: "",
    level: "",
    categoryId: "food-or-drink" as const,
    subcategoryId: "none" as const,
    effects: [],
  },
  ...foods.data,
  ...drinks.data,
} satisfies Record<string, FoodOrDrinkTemplate>

export const foodOrDrink = createSourceFile<FoodOrDrinkTemplate>()(FOOD_OR_DRINK)

export type FoodOrDrinkSource = FoodOrDrinkTemplate & { id: FoodOrDrinkId }

export type FoodOrDrinkId = (typeof foodOrDrink.ids)[number]
