import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const orzorgasSmokedBearHaunch = {
  id: "01a0e05d-1465-7b7f-9c6f-a5f4983d90f0",
  type: "page-type/temper-food-or-drink",
  slug: "orzorgas-smoked-bear-haunch",
  title: "Orzorga's Smoked Bear Haunch",
  description:
    "Increase Max Health by 4312, Health Recovery by 406 and Stamina and Magicka Recovery by 369 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 71059,
  itemIds: [71059],
  abilityId: 72824,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4312 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 406 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 369 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 369 },
  ],
  status: "supported",
  hashPlace: 16,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
