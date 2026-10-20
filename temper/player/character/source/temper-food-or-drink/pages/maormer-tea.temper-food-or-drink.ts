import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const maormerTea = {
  id: "01a15a12-c8b3-73c4-be03-691d679b15b5",
  type: "page-type/temper-food-or-drink",
  slug: "maormer-tea",
  title: "Maormer Tea",
  description: "Increase Magicka Recovery by 294 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28465,
  itemIds: [28465, 33684, 34017],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 294 }],
  status: "supported",
  hashPlace: 96,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
