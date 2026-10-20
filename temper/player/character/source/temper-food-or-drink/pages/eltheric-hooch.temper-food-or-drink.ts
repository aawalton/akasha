import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const elthericHooch = {
  id: "01a15a12-c8ac-7865-acb0-2681dcc9610e",
  type: "page-type/temper-food-or-drink",
  slug: "eltheric-hooch",
  title: "Eltheric Hooch",
  description: "Increase Health Recovery by 239 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28417,
  itemIds: [28417, 33624, 33957],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 239 }],
  status: "supported",
  hashPlace: 72,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
