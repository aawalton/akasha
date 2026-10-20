import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tarragonChicken = {
  id: "01a15a12-c8c0-7c02-b61b-3b3f0d581c8f",
  type: "page-type/temper-food-or-drink",
  slug: "tarragon-chicken",
  title: "Tarragon Chicken",
  description: "Increase Max Health by 1569 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_chicken.dds",
  foodOrDrinkKind: "food",
  itemId: 28301,
  itemIds: [28301, 28334, 28374],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 1569 }],
  status: "supported",
  hashPlace: 42,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
