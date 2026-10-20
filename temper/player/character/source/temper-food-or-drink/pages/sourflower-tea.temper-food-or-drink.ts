import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sourflowerTea = {
  id: "01a15a12-c8bb-7e8a-ab53-6b9668c0a0bc",
  type: "page-type/temper-food-or-drink",
  slug: "sourflower-tea",
  title: "Sourflower Tea",
  description: "Increase Magicka Recovery by 181 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28453,
  itemIds: [28453, 33666, 33999],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 181 }],
  status: "supported",
  hashPlace: 90,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
