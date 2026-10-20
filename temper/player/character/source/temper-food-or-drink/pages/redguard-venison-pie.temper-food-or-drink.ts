import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const redguardVenisonPie = {
  id: "01a15a12-c8b8-7a5a-b5ea-e86d15335b08",
  type: "page-type/temper-food-or-drink",
  slug: "redguard-venison-pie",
  title: "Redguard Venison Pie",
  description: "Increase Max Health by 2697 and Max Magicka by 2468 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fruit_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 33523,
  itemIds: [33523, 33585, 33846],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 2697 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 2468 },
  ],
  status: "supported",
  hashPlace: 197,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
