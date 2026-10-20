import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const lillandrilTonicTea = {
  id: "01a15a12-c8b3-702e-8a11-cd3b38c73fed",
  type: "page-type/temper-food-or-drink",
  slug: "lillandril-tonic-tea",
  title: "Lillandril Tonic Tea",
  description: "Increase Magicka and Stamina Recovery by 126 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28492,
  itemIds: [28492, 33711, 34044],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 126 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 126 },
  ],
  status: "supported",
  hashPlace: 110,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
