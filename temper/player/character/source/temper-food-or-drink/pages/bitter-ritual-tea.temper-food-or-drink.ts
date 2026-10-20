import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bitterRitualTea = {
  id: "01a15a12-c897-7ac6-873e-7c1eb13b4fc7",
  type: "page-type/temper-food-or-drink",
  slug: "bitter-ritual-tea",
  title: "Bitter Ritual Tea",
  description: "Increase Magicka Recovery by 441 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 57647,
  itemIds: [57647, 61075, 61076],
  seconds: 3960,
  level: "CP50",
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 441 }],
  status: "supported",
  hashPlace: 286,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
