import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const orzorgasRedFrothgar = {
  id: "01a15a12-c8b6-7ecd-b39e-0c4a415a6d02",
  type: "page-type/temper-food-or-drink",
  slug: "orzorgas-red-frothgar",
  title: "Orzorga's Red Frothgar",
  description: "Increase Max Health by 5395 and Magicka Recovery by 493 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 71056,
  itemIds: [71056],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5395 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 493 },
  ],
  status: "supported",
  hashPlace: 309,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
