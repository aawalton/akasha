import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const snowBearGlowWine = {
  id: "01a15a12-c8bb-7abd-b435-6655c26fc9a4",
  type: "page-type/temper-food-or-drink",
  slug: "snow-bear-glow-wine",
  title: "Snow Bear Glow-Wine",
  description:
    "Increase Stamina Recovery by 560 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_ice_bear_wine.dds",
  foodOrDrinkKind: "drink",
  itemId: 112440,
  itemIds: [112440, 171322],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 560 }],
  status: "supported",
  hashPlace: 332,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
