import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownFortifyingMeal = {
  id: "01a0e05d-1464-763a-bc76-844234e2287e",
  type: "page-type/temper-food-or-drink",
  slug: "crown-fortifying-meal",
  title: "Crown Fortifying Meal",
  description:
    "Increase Max Health by 4462, Max Magicka by 4105, and Max Stamina by 4105 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/store_crownfood_01.dds",
  foodOrDrinkKind: "food",
  itemId: 64711,
  itemIds: [64711, 135109, 214315],
  abilityId: 17581,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4462 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4105 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4105 },
  ],
  status: "supported",
  hashPlace: 7,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
