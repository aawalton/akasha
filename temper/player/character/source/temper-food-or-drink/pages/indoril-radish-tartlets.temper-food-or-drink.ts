import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const indorilRadishTartlets = {
  id: "01a15a12-c8b1-7ca6-9bac-af92ecff797e",
  type: "page-type/temper-food-or-drink",
  slug: "indoril-radish-tartlets",
  title: "Indoril Radish Tartlets",
  description: "Increase Max Stamina by 3326 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tart_004.dds",
  foodOrDrinkKind: "food",
  itemId: 33593,
  itemIds: [33593, 33795, 42796],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3326 }],
  status: "supported",
  hashPlace: 200,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
