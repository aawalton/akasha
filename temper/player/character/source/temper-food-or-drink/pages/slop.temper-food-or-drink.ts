import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const slop = {
  id: "01a15a12-c8ba-7ec5-95fa-8c27fd0faa36",
  type: "page-type/temper-food-or-drink",
  slug: "slop",
  title: "Slop",
  description: "Increase Max Magicka by 1512 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_vendor_fuel_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 32078,
  itemIds: [32078, 32090],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1512 }],
  status: "supported",
  hashPlace: 149,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
