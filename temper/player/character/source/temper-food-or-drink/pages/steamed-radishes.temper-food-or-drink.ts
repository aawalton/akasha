import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const steamedRadishes = {
  id: "01a15a12-c8bc-7156-a0e9-4e315c802a3d",
  type: "page-type/temper-food-or-drink",
  slug: "steamed-radishes",
  title: "Steamed Radishes",
  description: "Increase Max Stamina by 1058 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 28325,
  itemIds: [28325, 33358, 33831],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1058 }],
  status: "supported",
  hashPlace: 53,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
