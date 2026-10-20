import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldVvardenfellAshYamLoaf = {
  id: "01a15a12-c8a6-700e-bfda-91051bd9914f",
  type: "page-type/temper-food-or-drink",
  slug: "cold-vvardenfell-ash-yam-loaf",
  title: "cold Vvardenfell Ash Yam Loaf",
  description: "Increase Max Stamina by 3500 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_french_loaf.dds",
  foodOrDrinkKind: "food",
  itemId: 32142,
  itemIds: [32142, 32154],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3500 }],
  status: "supported",
  hashPlace: 175,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
