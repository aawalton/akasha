import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37802 = {
  id: "01a15a12-c8be-73b2-83e9-85958d795690",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37802",
  title: "Swill",
  description: "Increase Stamina Recovery by 226 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37802,
  itemIds: [37802, 37850],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 226 }],
  status: "supported",
  hashPlace: 235,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
