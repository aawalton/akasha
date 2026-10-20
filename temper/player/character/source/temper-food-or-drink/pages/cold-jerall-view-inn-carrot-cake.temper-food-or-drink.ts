import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldJerallViewInnCarrotCake = {
  id: "01a15a12-c8a6-7f5e-abc7-d1f0318ae214",
  type: "page-type/temper-food-or-drink",
  slug: "cold-jerall-view-inn-carrot-cake",
  title: "cold Jerall View Inn Carrot Cake",
  description: "Increase Max Stamina by 2450 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cake_004.dds",
  foodOrDrinkKind: "food",
  itemId: 32100,
  itemIds: [32100, 32112, 32120, 37809, 37857, 37905, 37953],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2450 }],
  status: "supported",
  hashPlace: 158,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
