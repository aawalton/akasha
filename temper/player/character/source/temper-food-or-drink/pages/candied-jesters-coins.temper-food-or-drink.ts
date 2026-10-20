import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const candiedJestersCoins = {
  id: "01a0e05d-1464-7d01-a90d-f2e75385cd73",
  type: "page-type/temper-food-or-drink",
  slug: "candied-jesters-coins",
  title: "Candied Jester's Coins",
  description:
    "Increase Max Stamina by 4592 and Magicka Recovery by 459 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_jester_chocolatecoin.dds",
  foodOrDrinkKind: "food",
  itemId: 120762,
  itemIds: [120762],
  abilityId: 89955,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4592 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 459 },
  ],
  status: "supported",
  hashPlace: 11,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
