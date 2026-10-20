import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const mammothSnoutPie = {
  id: "01a15a12-c8b3-73fc-a460-b43d5d259fc7",
  type: "page-type/temper-food-or-drink",
  slug: "mammoth-snout-pie",
  title: "Mammoth Snout Pie",
  description: "Increase Max Health by 4047 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fruit_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 33903,
  itemIds: [33903, 57085, 57088],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4047 }],
  status: "supported",
  hashPlace: 218,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
