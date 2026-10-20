import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldRadishesInRice = {
  id: "01a15a12-c8a6-73e9-9eaa-1c1c13d5e5cd",
  type: "page-type/temper-food-or-drink",
  slug: "cold-radishes-in-rice",
  title: "cold Radishes in Rice",
  description: "Increase Max Stamina by 1050 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_001.dds",
  foodOrDrinkKind: "food",
  itemId: 32070,
  itemIds: [32070, 32082, 37785, 37833, 37881, 37929],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1050 }],
  status: "supported",
  hashPlace: 141,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
