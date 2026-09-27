import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const springLoadedInfusion = {
  id: "01a0e05d-1465-7c37-be8a-e8893f952b65",
  type: "page-type/temper-food-or-drink",
  slug: "spring-loaded-infusion",
  title: "Spring Loaded Infusion",
  description: "Increases Max Health by 4165, and Max Magicka and Stamina by 3867 for 2 hours.",
  icon: "/esoui/art/icons/justice_stolen_tin_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 133555,
  abilityId: 100488,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4165 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3867 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3867 },
  ],
  hashPlace: 33,
} as const satisfies TemperFoodOrDrink
