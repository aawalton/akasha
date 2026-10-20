import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownVigorousTincture = {
  id: "01a15a12-c8aa-7c33-ab7c-a5496a1c9e13",
  type: "page-type/temper-food-or-drink",
  slug: "crown-vigorous-tincture",
  title: "Crown Vigorous Tincture",
  description:
    "Increase Stamina Recovery by 493 and Health Recovery by 539 for 1.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/crowncrate_staminahealth_drink.dds",
  foodOrDrinkKind: "drink",
  itemId: 124678,
  itemIds: [124678],
  seconds: 5400,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 493 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 539 },
  ],
  status: "supported",
  hashPlace: 339,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
