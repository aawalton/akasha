import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleHareInGarlicSauce = {
  id: "01a15a12-c8bb-7bb7-ab56-9c7b6d2866ab",
  type: "page-type/temper-food-or-drink",
  slug: "stale-hare-in-garlic-sauce",
  title: "stale Hare in Garlic Sauce",
  description: "Increase Max Health by 2695 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 32119,
  itemIds: [32119, 32131, 37810, 37858, 40298, 40299],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 2695 }],
  status: "supported",
  hashPlace: 164,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
