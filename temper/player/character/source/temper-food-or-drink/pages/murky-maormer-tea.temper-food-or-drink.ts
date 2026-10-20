import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const murkyMaormerTea = {
  id: "01a15a12-c8b4-78b7-919a-074b05ebae54",
  type: "page-type/temper-food-or-drink",
  slug: "murky-maormer-tea",
  title: "murky Maormer Tea",
  description: "Increase Magicka Recovery by 245 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32116,
  itemIds: [32116, 32128, 37807, 37855, 37903, 37951],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 245 }],
  status: "supported",
  hashPlace: 161,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
