import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ghastlyEyeBowl = {
  id: "01a0e05d-1464-7fe2-afea-f88015b9d459",
  type: "page-type/temper-food-or-drink",
  slug: "ghastly-eye-bowl",
  title: "Ghastly Eye Bowl",
  description: "Increases Max Magicka by 4592 and Magicka Recovery by 459 for 2 hours.",
  icon: "/esoui/art/icons/event_halloween_2016_skull_cup_eyeballs.dds",
  foodOrDrinkKind: "drink",
  itemId: 87695,
  abilityId: 84700,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4592 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 459 },
  ],
  hashPlace: 25,
} as const satisfies TemperFoodOrDrink
