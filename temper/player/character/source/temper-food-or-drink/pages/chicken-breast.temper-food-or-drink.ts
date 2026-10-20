import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const chickenBreast = {
  id: "01a15a12-c89b-7c7e-ac64-41c43c6fa527",
  type: "page-type/temper-food-or-drink",
  slug: "chicken-breast",
  title: "Chicken Breast",
  description: "Increase Max Health by 385 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_chicken.dds",
  foodOrDrinkKind: "food",
  itemId: 30446,
  itemIds: [30446, 30458, 30586, 30588, 30589, 30590, 37774, 37822, 37870, 37918],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 385 }],
  status: "supported",
  hashPlace: 135,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
