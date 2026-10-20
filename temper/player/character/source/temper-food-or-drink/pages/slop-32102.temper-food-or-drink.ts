import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const slop32102 = {
  id: "01a15a12-c8ba-7d2e-bcf0-b855e310f850",
  type: "page-type/temper-food-or-drink",
  slug: "slop-32102",
  title: "Slop",
  description: "Increase Max Magicka by 2268 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_vendor_fuel_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 32102,
  itemIds: [32102, 32114],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 2268 }],
  status: "supported",
  hashPlace: 159,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
