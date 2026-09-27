import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const frostedBrains = {
  id: "01a0e05d-1464-7bc9-9534-c5ce2381801f",
  type: "page-type/temper-food-or-drink",
  slug: "frosted-brains",
  title: "Frosted Brains",
  description: "Increases Max Magicka by 4592 and Health Recovery by 505 for 2 hours.",
  icon: "/esoui/art/icons/event_halloween_2016_candy_brain.dds",
  foodOrDrinkKind: "food",
  itemId: 87696,
  abilityId: 84725,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4592 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 505 },
  ],
  hashPlace: 9,
} as const satisfies TemperFoodOrDrink
