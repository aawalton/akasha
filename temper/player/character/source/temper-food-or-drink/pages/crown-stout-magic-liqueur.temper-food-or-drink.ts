import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownStoutMagicLiqueur = {
  id: "01a15a12-c8aa-787e-adf6-5d0f0217e2f9",
  type: "page-type/temper-food-or-drink",
  slug: "crown-stout-magic-liqueur",
  title: "Crown Stout Magic Liqueur",
  description:
    "Increase Magicka Recovery by 493 and Health Recovery by 539 for 1.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/crowncrate_magickahealth_drink.dds",
  foodOrDrinkKind: "drink",
  itemId: 124677,
  itemIds: [124677],
  seconds: 5400,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 493 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 539 },
  ],
  status: "supported",
  hashPlace: 338,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
