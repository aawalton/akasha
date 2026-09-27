import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const candiedJestersCoins = {
  id: "01a0e05d-1464-7d01-a90d-f2e75385cd73",
  type: "page-type/temper-food-or-drink",
  slug: "candied-jesters-coins",
  title: "Candied Jesters Coins",
  description: "Increases Max Stamina by 4592 and Magicka Recovery by 459 for 2 hours.",
  icon: "/esoui/art/icons/event_jester_chocolatecoin.dds",
  foodOrDrinkKind: "food",
  itemId: 120762,
  abilityId: 89955,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4592 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 459 },
  ],
  hashPlace: 11,
} as const satisfies TemperFoodOrDrink
