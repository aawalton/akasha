import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownFortifyingMeal = {
  id: "01a0e05d-1464-763a-bc76-844234e2287e",
  type: "page-type/temper-food-or-drink",
  slug: "crown-fortifying-meal",
  title: "Crown Fortifying Meal",
  description:
    "Increases Max Health by 4462, Max Magicka by 4105, and Max Stamina by 4105 for 2 hours.",
  icon: "/esoui/art/icons/store_crownfood_01.dds",
  foodOrDrinkKind: "food",
  itemId: 64711,
  abilityId: 17581,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4462 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4105 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4105 },
  ],
  hashPlace: 7,
} as const satisfies TemperFoodOrDrink
