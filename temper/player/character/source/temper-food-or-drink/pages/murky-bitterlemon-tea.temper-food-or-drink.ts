import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const murkyBitterlemonTea = {
  id: "01a15a12-c8b4-7f0a-80c0-c8622e7e50b5",
  type: "page-type/temper-food-or-drink",
  slug: "murky-bitterlemon-tea",
  title: "murky Bitterlemon Tea",
  description: "Increase Magicka Recovery by 175 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 32092,
  itemIds: [32092, 32104, 37891, 37939, 61048],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 175 }],
  status: "supported",
  hashPlace: 151,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
