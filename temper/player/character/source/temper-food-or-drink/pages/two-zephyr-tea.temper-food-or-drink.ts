import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const twoZephyrTea = {
  id: "01a15a12-c8c2-7b89-bd5e-88536ab23ceb",
  type: "page-type/temper-food-or-drink",
  slug: "two-zephyr-tea",
  title: "Two-Zephyr Tea",
  description: "Increase Magicka Recovery by 370 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28473,
  itemIds: [28473, 57159, 57160],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 370 }],
  status: "supported",
  hashPlace: 101,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
