import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const orsiniumPinkZinfandel = {
  id: "01a15a12-c8b6-7c42-a8be-d1fb126f265b",
  type: "page-type/temper-food-or-drink",
  slug: "orsinium-pink-zinfandel",
  title: "Orsinium Pink Zinfandel",
  description:
    "Increase Health Recovery by 309 and Magicka and Stamina Recovery by 284 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28518,
  itemIds: [28518, 33438, 33459, 34072],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 309 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 284 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 284 },
  ],
  status: "supported",
  hashPlace: 126,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
