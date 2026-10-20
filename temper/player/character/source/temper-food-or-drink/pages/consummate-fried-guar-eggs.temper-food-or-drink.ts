import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const consummateFriedGuarEggs = {
  id: "01a15a12-c8a8-7a97-8f27-452f211e0634",
  type: "page-type/temper-food-or-drink",
  slug: "consummate-fried-guar-eggs",
  title: "Consummate Fried Guar Eggs",
  description: "Increase Max Health, Magicka and Stamina by 245 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28286,
  itemIds: [28286],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 245 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 245 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 245 },
  ],
  status: "supported",
  hashPlace: 37,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
