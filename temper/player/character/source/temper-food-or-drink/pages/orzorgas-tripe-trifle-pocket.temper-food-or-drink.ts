import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const orzorgasTripeTriflePocket = {
  id: "01a15a12-c8b7-7e3c-be19-5e5a974a1f4b",
  type: "page-type/temper-food-or-drink",
  slug: "orzorgas-tripe-trifle-pocket",
  title: "Orzorga's Tripe Trifle Pocket",
  description: "Increase Max Health by 5395 and Stamina Recovery by 493 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dessert_002.dds",
  foodOrDrinkKind: "food",
  itemId: 71057,
  itemIds: [71057],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5395 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 493 },
  ],
  status: "supported",
  hashPlace: 310,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
