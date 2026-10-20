import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bergamaWarningFire = {
  id: "01a0e05d-1464-7ffb-92dd-254fce5b989f",
  type: "page-type/temper-food-or-drink",
  slug: "bergama-warning-fire",
  title: "Bergama Warning Fire",
  description:
    "Increase Max Stamina by 4936 and Health Recovery by 539 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_warning_fire.dds",
  foodOrDrinkKind: "drink",
  itemId: 112426,
  itemIds: [112426],
  abilityId: 86677,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4936 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 539 },
  ],
  status: "supported",
  hashPlace: 28,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
