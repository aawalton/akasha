import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const witchmothersPotentBrew = {
  id: "01a0e05d-1465-7d23-b2c3-72aa511b0df0",
  type: "page-type/temper-food-or-drink",
  slug: "witchmothers-potent-brew",
  title: "Witchmother's Potent Brew",
  description:
    "Increase Max Magicka by 2856, Max Health by 3094, and Magicka Recovery by 315 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_iron_cup_bones.dds",
  foodOrDrinkKind: "drink",
  itemId: 87697,
  itemIds: [87697],
  abilityId: 84731,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 2856 },
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3094 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 315 },
  ],
  status: "supported",
  hashPlace: 30,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
