import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownCrateRefreshingDrink = {
  id: "01a15a12-c8a9-7e0b-b096-9bd3f7c596d2",
  type: "page-type/temper-food-or-drink",
  slug: "crown-crate-refreshing-drink",
  title: "Crown Crate Refreshing Drink",
  description:
    "Increase Health Recovery by 446, Magicka Recovery by 410, and Stamina Recovery by 410 for 1.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/crowncrate_tricolor_drink_01.dds",
  foodOrDrinkKind: "drink",
  itemId: 94438,
  itemIds: [94438],
  seconds: 5400,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 446 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 410 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 410 },
  ],
  status: "supported",
  hashPlace: 328,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
