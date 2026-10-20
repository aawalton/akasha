import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const garlicAndPepperVenisonSteak = {
  id: "01a15a12-c8ae-77c3-826f-f002595a631d",
  type: "page-type/temper-food-or-drink",
  slug: "garlic-and-pepper-venison-steak",
  title: "Garlic-and-Pepper Venison Steak",
  description: "Increase Max Health by 5852 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_sirloin.dds",
  foodOrDrinkKind: "food",
  itemId: 57637,
  itemIds: [57637],
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 5852 }],
  status: "supported",
  hashPlace: 279,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
