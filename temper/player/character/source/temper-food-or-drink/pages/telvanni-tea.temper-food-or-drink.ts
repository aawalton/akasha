import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const telvanniTea = {
  id: "01a15a12-c8c0-71a5-a167-c5645c22ec0c",
  type: "page-type/temper-food-or-drink",
  slug: "telvanni-tea",
  title: "Telvanni Tea",
  description: "Increase Magicka and Stamina Recovery by 415 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 34030,
  itemIds: [34030, 46060, 57199],
  seconds: 5400,
  level: "CP50",
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 415 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 415 },
  ],
  status: "supported",
  hashPlace: 230,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
