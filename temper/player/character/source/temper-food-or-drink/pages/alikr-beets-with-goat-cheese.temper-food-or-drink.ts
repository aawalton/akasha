import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const alikrBeetsWithGoatCheese = {
  id: "01a15a12-c893-7a51-9592-45e833d7544c",
  type: "page-type/temper-food-or-drink",
  slug: "alikr-beets-with-goat-cheese",
  title: "Alik'r Beets with Goat Cheese",
  description: "Increase Max Stamina by 2192 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28338,
  itemIds: [28338, 28394, 33478],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 2192 }],
  status: "supported",
  hashPlace: 57,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
