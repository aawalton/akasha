import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ryeInYourEye = {
  id: "01a15a12-c8b9-7dc8-b1e1-8f4c51db24b6",
  type: "page-type/temper-food-or-drink",
  slug: "rye-in-your-eye",
  title: "Rye-in-your-Eye",
  description: "Increase Health Recovery by 363 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28429,
  itemIds: [28429, 33642, 33975],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 363 }],
  status: "supported",
  hashPlace: 78,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
