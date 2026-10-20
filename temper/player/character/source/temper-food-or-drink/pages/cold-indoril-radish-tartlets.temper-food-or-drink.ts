import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldIndorilRadishTartlets = {
  id: "01a15a12-c8a6-78d4-a6a4-9331c9d9a00f",
  type: "page-type/temper-food-or-drink",
  slug: "cold-indoril-radish-tartlets",
  title: "cold Indoril Radish Tartlets",
  description: "Increase Max Stamina by 2800 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tart_004.dds",
  foodOrDrinkKind: "food",
  itemId: 32118,
  itemIds: [32118, 32130, 37815, 37863, 37911, 37959],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 2800 }],
  status: "supported",
  hashPlace: 163,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
