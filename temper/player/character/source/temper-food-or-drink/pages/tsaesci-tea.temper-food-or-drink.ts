import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tsaesciTea = {
  id: "01a15a12-c8c1-74b5-82cf-1bcbc05db476",
  type: "page-type/temper-food-or-drink",
  slug: "tsaesci-tea",
  title: "Tsaesci Tea",
  description: "Increase Magicka and Stamina Recovery by 156 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28496,
  itemIds: [28496, 33717, 34050],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 156 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 156 },
  ],
  status: "supported",
  hashPlace: 112,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
