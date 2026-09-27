import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const noFoodOrDrink = {
  id: "01a0e05b-0a65-73f2-8cfa-3b6601e589f4",
  type: "page-type/temper-food-or-drink",
  slug: "no-food-or-drink",
  title: "No Food or Drink",
  foodOrDrinkKind: "none",
  itemId: 0,
  abilityId: 0,
  seconds: 0,
  hashPlace: 0,
} as const satisfies TemperFoodOrDrink
