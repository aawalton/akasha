import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedBravilMelonSalad = {
  id: "01a15a12-c8a8-74a8-b2f1-82f3ef2c3283",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-bravil-melon-salad",
  title: "congealed Bravil Melon Salad",
  description: "Increase Max Magicka by 1050 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 32072,
  itemIds: [32072, 32084, 37787, 37835, 37883, 37931],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1050 }],
  status: "supported",
  hashPlace: 143,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
