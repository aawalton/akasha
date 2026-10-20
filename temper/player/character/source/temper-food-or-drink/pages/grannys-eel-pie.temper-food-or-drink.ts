import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const grannysEelPie = {
  id: "01a15a12-c8af-7144-8a41-29d2e0106bf5",
  type: "page-type/temper-food-or-drink",
  slug: "grannys-eel-pie",
  title: "Granny's Eel Pie",
  description:
    "Increase Max Health by 5790, Poison Resistance by 5464, and Healing Taken by 7%.\nWhile in Werewolf form, increase Block Mitigation by 10% for 2.5 hours.",
  icon: "/esoui/art/icons/housing_bre_inc_potpie001.dds",
  foodOrDrinkKind: "food",
  itemId: 225205,
  itemIds: [225205],
  seconds: 9000,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5790 }],
  status: "partially-supported",
  hashPlace: 348,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
