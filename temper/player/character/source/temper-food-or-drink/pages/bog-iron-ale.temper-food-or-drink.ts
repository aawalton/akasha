import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bogIronAle = {
  id: "01a15a12-c897-7bcd-878e-238cfb844dc1",
  type: "page-type/temper-food-or-drink",
  slug: "bog-iron-ale",
  title: "Bog-Iron Ale",
  description: "Increase Health Recovery by 115 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28405,
  itemIds: [28405, 32067, 32079, 33606, 33939, 37782, 37830, 37878, 37926],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 115 }],
  status: "supported",
  hashPlace: 66,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
