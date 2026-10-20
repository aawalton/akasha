import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyComberryChai = {
  id: "01a15a12-c89c-7f2c-a3c0-c974ea2597c0",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-comberry-chai",
  title: "cloudy Comberry Chai",
  description: "Increase Health Recovery by 77 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 30587,
  itemIds: [30587, 32145, 32157, 37776, 37824, 37872, 37920, 61044],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 77 }],
  status: "supported",
  hashPlace: 140,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
