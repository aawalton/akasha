import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const comberryCitrusQuencher = {
  id: "01a15a12-c8a7-761d-ada1-aa4fede5e06a",
  type: "page-type/temper-food-or-drink",
  slug: "comberry-citrus-quencher",
  title: "Comberry Citrus Quencher",
  description: "Increase Magicka Recovery by 567 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 57203,
  itemIds: [57203, 57204, 57205],
  seconds: 3960,
  level: "CP100",
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 567 }],
  status: "supported",
  hashPlace: 268,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
