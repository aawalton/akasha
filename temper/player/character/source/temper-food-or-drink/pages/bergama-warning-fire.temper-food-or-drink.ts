import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bergamaWarningFire = {
  id: "01a0e05d-1464-7ffb-92dd-254fce5b989f",
  type: "page-type/temper-food-or-drink",
  slug: "bergama-warning-fire",
  title: "Bergama Warning Fire",
  description: "Increases Max Stamina by 4936 and Health Recovery by 539 for 2 hours.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_warning_fire.dds",
  foodOrDrinkKind: "drink",
  itemId: 112426,
  abilityId: 86677,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4936 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 539 },
  ],
  hashPlace: 28,
} as const satisfies TemperFoodOrDrink
