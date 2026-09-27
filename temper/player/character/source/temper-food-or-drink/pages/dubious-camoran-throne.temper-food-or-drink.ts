import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const dubiousCamoranThrone = {
  id: "01a0e05d-1464-7e0a-b250-8b2bc4335000",
  type: "page-type/temper-food-or-drink",
  slug: "dubious-camoran-throne",
  title: "Dubious Camoran Throne",
  description:
    "Increases Stamina Recovery by 315, Max Stamina by 2856 and Max Health by 3094 for 2 hours.",
  icon: "/esoui/art/icons/event_jester_fancystonewarejug.dds",
  foodOrDrinkKind: "drink",
  itemId: 120763,
  abilityId: 89957,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 315 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2856 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3094 },
  ],
  hashPlace: 32,
} as const satisfies TemperFoodOrDrink
