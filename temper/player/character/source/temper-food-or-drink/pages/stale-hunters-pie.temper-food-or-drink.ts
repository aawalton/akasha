import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleHuntersPie = {
  id: "01a15a12-c8bc-70cd-ae30-145e980112a4",
  type: "page-type/temper-food-or-drink",
  slug: "stale-hunters-pie",
  title: "stale Hunter's Pie",
  description: "Increase Max Health by 1155 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_pot_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 32071,
  itemIds: [32071, 32083, 37786, 37834],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 1155 }],
  status: "supported",
  hashPlace: 142,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
