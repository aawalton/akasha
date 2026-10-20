import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const grilledHare = {
  id: "01a15a12-c8b0-71cf-b8a0-381abe641c33",
  type: "page-type/temper-food-or-drink",
  slug: "grilled-hare",
  title: "Grilled Hare",
  description: "Increase Max Health by 770 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_poultry.dds",
  foodOrDrinkKind: "food",
  itemId: 30447,
  itemIds: [30447, 30459, 37828, 37876, 37924],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 770 }],
  status: "supported",
  hashPlace: 136,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
