import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const kwamaEggQuiche = {
  id: "01a15a12-c8b3-72e8-9960-ec4d0de4d6a8",
  type: "page-type/temper-food-or-drink",
  slug: "kwama-egg-quiche",
  title: "Kwama Egg Quiche",
  description: "Increase Max Health by 4851 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 57623,
  itemIds: [57623, 57635],
  seconds: 3960,
  level: "CP50",
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4851 }],
  status: "supported",
  hashPlace: 273,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
