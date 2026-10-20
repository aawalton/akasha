import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const roastVenison = {
  id: "01a15a12-c8b9-7a4f-960b-db5f9198f235",
  type: "page-type/temper-food-or-drink",
  slug: "roast-venison",
  title: "Roast Venison",
  description: "Increase Max Health by 1156 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28289,
  itemIds: [28289, 28362, 42804],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 1156 }],
  status: "supported",
  hashPlace: 38,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
