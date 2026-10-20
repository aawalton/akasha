import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetDreamsTea = {
  id: "01a15a12-c8bd-7a3a-8013-335b62f2a139",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-dreams-tea",
  title: "Sweet Dreams Tea",
  description: "Increase Magicka Recovery by 408 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 28477,
  itemIds: [28477, 57171, 57172],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 408 }],
  status: "supported",
  hashPlace: 103,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
