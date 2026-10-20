import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const garlicMashedPotatoes = {
  id: "01a15a12-c8ae-7254-8d8b-1680f7d9e9cb",
  type: "page-type/temper-food-or-drink",
  slug: "garlic-mashed-potatoes",
  title: "Garlic Mashed Potatoes",
  description: "Increase Max Stamina by 2948 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28346,
  itemIds: [28346, 33514, 33575],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 2948 }],
  status: "supported",
  hashPlace: 59,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
