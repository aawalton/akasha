import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const puckermintTea = {
  id: "01a15a12-c8b8-7c6e-9eda-47f6730b2f33",
  type: "page-type/temper-food-or-drink",
  slug: "puckermint-tea",
  title: "Puckermint Tea",
  description: "Increase Magicka Recovery by 332 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28469,
  itemIds: [28469, 33690, 34023],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 332 }],
  status: "supported",
  hashPlace: 99,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
