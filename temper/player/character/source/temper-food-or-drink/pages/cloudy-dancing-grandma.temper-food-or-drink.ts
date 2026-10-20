import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyDancingGrandma = {
  id: "01a15a12-c89c-76a5-aa03-421acb57f7e7",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-dancing-grandma",
  title: "cloudy Dancing Grandma",
  description: "Increase Stamina Recovery by 245 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 37808,
  itemIds: [37808, 37856, 37904, 37952, 61054],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 245 }],
  status: "supported",
  hashPlace: 238,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
