import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyAmbrosia = {
  id: "01a15a12-c89b-7912-89fc-c13d83f62013",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-ambrosia",
  title: "Cloudy Ambrosia",
  description: "Increase Stamina Recovery by 315 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32141,
  itemIds: [32141, 32153, 61036, 61058, 61059],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 315 }],
  status: "supported",
  hashPlace: 174,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
