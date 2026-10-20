import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const honeyberryTea = {
  id: "01a15a12-c8b1-746e-82ce-bcbe35785825",
  type: "page-type/temper-food-or-drink",
  slug: "honeyberry-tea",
  title: "Honeyberry Tea",
  description: "Increase Magicka Recovery by 143 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28449,
  itemIds: [28449, 33660, 33993],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 143 }],
  status: "supported",
  hashPlace: 88,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
