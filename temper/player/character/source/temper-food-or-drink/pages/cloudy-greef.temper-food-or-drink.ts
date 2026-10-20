import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyGreef = {
  id: "01a15a12-c89c-7a31-adba-5c48ffe7fc21",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-greef",
  title: "Cloudy Greef",
  description: "Increase Stamina Recovery by 210 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32099,
  itemIds: [32099, 32111, 32147, 32159, 37898, 37946, 61052],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 210 }],
  status: "supported",
  hashPlace: 157,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
