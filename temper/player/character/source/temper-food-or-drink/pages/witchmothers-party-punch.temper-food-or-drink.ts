import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const witchmothersPartyPunch = {
  id: "01a15a12-c8c2-7b5b-b54a-de390535b416",
  type: "page-type/temper-food-or-drink",
  slug: "witchmothers-party-punch",
  title: "Witchmother's Party Punch",
  description:
    "Increase Magicka Recovery and Stamina Recovery by 357 and Health Recovery by 392 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_iron_cup_celery.dds",
  foodOrDrinkKind: "drink",
  itemId: 87690,
  itemIds: [87690, 208142],
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 357 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 357 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 392 },
  ],
  status: "supported",
  hashPlace: 326,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
