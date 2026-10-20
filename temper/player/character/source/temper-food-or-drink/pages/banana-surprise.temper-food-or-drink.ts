import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bananaSurprise = {
  id: "01a15a12-c896-7721-bd17-26201fb1298c",
  type: "page-type/temper-food-or-drink",
  slug: "banana-surprise",
  title: "Banana Surprise",
  description: "Increase Max Magicka by 680 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 28281,
  itemIds: [28281, 33825, 33837],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 680 }],
  status: "supported",
  hashPlace: 36,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
