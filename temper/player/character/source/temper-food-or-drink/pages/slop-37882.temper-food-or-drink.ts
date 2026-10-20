import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const slop37882 = {
  id: "01a15a12-c8ba-703a-b4be-ee83dfa6b618",
  type: "page-type/temper-food-or-drink",
  slug: "slop-37882",
  title: "Slop",
  description: "Increase Max Health by 1239 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_vendor_fuel_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 37882,
  itemIds: [37882, 37930],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 1239 }],
  status: "supported",
  hashPlace: 241,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
