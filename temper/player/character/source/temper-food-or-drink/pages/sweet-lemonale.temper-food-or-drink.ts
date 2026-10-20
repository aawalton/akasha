import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetLemonale = {
  id: "01a15a12-c8bd-7df1-86f3-fe3b54ffba57",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-lemonale",
  title: "Sweet Lemonale",
  description: "Increase Health Recovery by 269 and Magicka Recovery by 246 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28427,
  itemIds: [28427, 33638, 33971],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 269 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 246 },
  ],
  status: "supported",
  hashPlace: 77,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
