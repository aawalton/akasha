import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const frostfallPorkRoast = {
  id: "01a15a12-c8ae-7309-a0d4-104315bac1a2",
  type: "page-type/temper-food-or-drink",
  slug: "frostfall-pork-roast",
  title: "Frostfall Pork Roast",
  description: "Increase Max Health by 2697 and Max Stamina by 2468 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_003.dds",
  foodOrDrinkKind: "food",
  itemId: 33516,
  itemIds: [33516, 33578, 33839],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 2697 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2468 },
  ],
  status: "supported",
  hashPlace: 196,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
