import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37868 = {
  id: "01a15a12-c8be-711c-ba4d-d2f677a7ac3c",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37868",
  title: "Swill",
  description: "Increase Stamina Recovery by 37 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37868,
  itemIds: [37868, 37916],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 37 }],
  status: "supported",
  hashPlace: 239,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
