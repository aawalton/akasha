import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleBread = {
  id: "01a15a12-c8bb-774b-a624-1d2b5101c7d1",
  type: "page-type/temper-food-or-drink",
  slug: "stale-bread",
  title: "Stale Bread",
  description: "Increase Max Health by 0 for 1.1 hours.",
  icon: "/esoui/art/icons/quest_food_004.dds",
  foodOrDrinkKind: "food",
  itemId: 30585,
  itemIds: [30585, 94211, 132530],
  seconds: 3960,
  status: "unsupported",
  hashPlace: 139,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
