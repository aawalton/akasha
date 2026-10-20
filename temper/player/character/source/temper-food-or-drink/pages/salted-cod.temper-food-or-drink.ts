import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const saltedCod = {
  id: "01a15a12-c8b9-75ee-ac5a-11a3a1f6efa0",
  type: "page-type/temper-food-or-drink",
  slug: "salted-cod",
  title: "Salted Cod",
  description: "Increase Max Health by 2808 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_fish.dds",
  foodOrDrinkKind: "food",
  itemId: 33502,
  itemIds: [33502, 33563, 33861],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 2808 }],
  status: "supported",
  hashPlace: 192,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
