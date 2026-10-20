import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const greenSalad = {
  id: "01a15a12-c8b0-7ce6-982a-7637dd7c2452",
  type: "page-type/temper-food-or-drink",
  slug: "green-salad",
  title: "Green Salad",
  description: "Increase Max Stamina by 700 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_001.dds",
  foodOrDrinkKind: "food",
  itemId: 30445,
  itemIds: [30445, 30457, 37827, 37875, 37923],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 700 }],
  status: "supported",
  hashPlace: 134,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
