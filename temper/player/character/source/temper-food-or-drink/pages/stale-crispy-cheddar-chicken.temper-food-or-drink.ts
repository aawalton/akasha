import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleCrispyCheddarChicken = {
  id: "01a15a12-c8bb-7ea9-882e-38462e359e9e",
  type: "page-type/temper-food-or-drink",
  slug: "stale-crispy-cheddar-chicken",
  title: "stale Crispy Cheddar Chicken",
  description: "Increase Max Health by 3080 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_chicken.dds",
  foodOrDrinkKind: "food",
  itemId: 32125,
  itemIds: [32125, 32137, 37816, 37864, 37912, 37960],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 3080 }],
  status: "supported",
  hashPlace: 169,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
