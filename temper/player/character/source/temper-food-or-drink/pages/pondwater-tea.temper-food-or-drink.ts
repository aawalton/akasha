import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const pondwaterTea = {
  id: "01a15a12-c8b7-7f81-b0e6-b554d1288bfa",
  type: "page-type/temper-food-or-drink",
  slug: "pondwater-tea",
  title: "Pondwater Tea",
  description: "Increase Magicka and Stamina Recovery by 186 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28500,
  itemIds: [28500, 33723, 34056],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 186 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 186 },
  ],
  status: "supported",
  hashPlace: 114,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
