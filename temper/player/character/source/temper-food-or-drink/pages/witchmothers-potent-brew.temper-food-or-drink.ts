import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const witchmothersPotentBrew = {
  id: "01a0e05d-1465-7d23-b2c3-72aa511b0df0",
  type: "page-type/temper-food-or-drink",
  slug: "witchmothers-potent-brew",
  title: "Witchmothers Potent Brew",
  description:
    "Increases Max Magicka by 2856, Max Health by 3094, and Magicka Recovery by 315 for 2 hours.",
  icon: "/esoui/art/icons/event_halloween_2016_iron_cup_bones.dds",
  foodOrDrinkKind: "drink",
  itemId: 87697,
  abilityId: 84731,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2856 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3094 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 315 },
  ],
  hashPlace: 30,
} as const satisfies TemperFoodOrDrink
