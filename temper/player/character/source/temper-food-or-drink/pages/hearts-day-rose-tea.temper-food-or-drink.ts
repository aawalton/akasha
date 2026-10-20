import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const heartsDayRoseTea = {
  id: "01a15a12-c8b0-7efe-b0e0-03bf14f5facf",
  type: "page-type/temper-food-or-drink",
  slug: "hearts-day-rose-tea",
  title: "Heart's Day Rose Tea",
  description: "Increase Magicka Recovery by 532 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_006.dds",
  foodOrDrinkKind: "drink",
  itemId: 71250,
  itemIds: [71250],
  seconds: 3960,
  level: "CP150",
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 532 }],
  status: "supported",
  hashPlace: 319,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
