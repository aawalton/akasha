import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crunchySpiderSkewer = {
  id: "01a0e05d-1464-7d5a-bfe6-4f32734d295b",
  type: "page-type/temper-food-or-drink",
  slug: "crunchy-spider-skewer",
  title: "Crunchy Spider Skewer",
  description: "Increases Max Magicka by 4592 and Stamina Recovery by 459 for 2 hours.",
  icon: "/esoui/art/icons/event_halloween_2016_kebab_bugs.dds",
  foodOrDrinkKind: "food",
  itemId: 87691,
  abilityId: 84709,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4592 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 459 },
  ],
  hashPlace: 8,
} as const satisfies TemperFoodOrDrink
