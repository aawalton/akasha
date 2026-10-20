import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const twoZephyrTea61037 = {
  id: "01a15a12-c8c2-7a31-94cc-1ae1de564cdb",
  type: "page-type/temper-food-or-drink",
  slug: "two-zephyr-tea-61037",
  title: "Two-Zephyr Tea",
  description: "Increase Magicka Recovery by 315 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 61037,
  itemIds: [61037, 61055, 61060],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 315 }],
  status: "supported",
  hashPlace: 293,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
