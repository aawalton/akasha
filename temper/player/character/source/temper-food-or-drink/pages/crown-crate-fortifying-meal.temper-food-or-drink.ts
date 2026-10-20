import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownCrateFortifyingMeal = {
  id: "01a15a12-c8a9-7e35-8a7f-8f1323555ace",
  type: "page-type/temper-food-or-drink",
  slug: "crown-crate-fortifying-meal",
  title: "Crown Crate Fortifying Meal",
  description:
    "Increase Max Health by 4462, Max Magicka by 4105, and Max Stamina by 4105 for 1.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/store_tricolor_food_01.dds",
  foodOrDrinkKind: "food",
  itemId: 94437,
  itemIds: [94437],
  seconds: 5400,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4462 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4105 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4105 },
  ],
  status: "supported",
  hashPlace: 327,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
