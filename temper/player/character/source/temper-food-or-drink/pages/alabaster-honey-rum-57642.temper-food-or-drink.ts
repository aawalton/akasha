import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const alabasterHoneyRum57642 = {
  id: "01a15a12-c893-711c-8d63-a4adbbe3403a",
  type: "page-type/temper-food-or-drink",
  slug: "alabaster-honey-rum-57642",
  title: "Alabaster Honey Rum",
  description: "Increase Health Recovery by 546 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57642,
  itemIds: [57642],
  seconds: 3960,
  level: "CP100",
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 546 }],
  status: "supported",
  hashPlace: 283,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
