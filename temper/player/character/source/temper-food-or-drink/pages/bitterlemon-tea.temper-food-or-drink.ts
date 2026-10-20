import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bitterlemonTea = {
  id: "01a15a12-c897-7dc2-9f24-5f599e4b5934",
  type: "page-type/temper-food-or-drink",
  slug: "bitterlemon-tea",
  title: "Bitterlemon Tea",
  description: "Increase Magicka Recovery by 219 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28457,
  itemIds: [28457, 33672, 34005],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 219 }],
  status: "supported",
  hashPlace: 92,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
