import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleMammothSnoutPie = {
  id: "01a15a12-c8bc-70a8-b615-c78bdefa0583",
  type: "page-type/temper-food-or-drink",
  slug: "stale-mammoth-snout-pie",
  title: "stale Mammoth Snout Pie",
  description: "Increase Max Health by 3465 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fruit_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 32143,
  itemIds: [32143, 32155],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3465 }],
  status: "supported",
  hashPlace: 176,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
