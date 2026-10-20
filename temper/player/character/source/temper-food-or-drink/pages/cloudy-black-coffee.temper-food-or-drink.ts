import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyBlackCoffee = {
  id: "01a15a12-c89b-757e-b7ea-6bba3e8541c0",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-black-coffee",
  title: "cloudy Black Coffee",
  description: "Increase Stamina Recovery by 70 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 37874,
  itemIds: [37874, 37922, 61045, 61046],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 70 }],
  status: "supported",
  hashPlace: 240,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
