import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const nocturnalsEverblackCoffee = {
  id: "01a15a12-c8b6-7957-b4e6-fa7d49239acd",
  type: "page-type/temper-food-or-drink",
  slug: "nocturnals-everblack-coffee",
  title: "Nocturnal's Everblack Coffee",
  description: "Increase Stamina Recovery by 497 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 57654,
  itemIds: [57654],
  seconds: 3960,
  level: "CP100",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 497 }],
  status: "supported",
  hashPlace: 291,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
