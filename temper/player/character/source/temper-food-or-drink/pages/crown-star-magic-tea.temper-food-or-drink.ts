import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownStarMagicTea = {
  id: "01a15a12-c8aa-742f-bb79-520ad6bd5a3e",
  type: "page-type/temper-food-or-drink",
  slug: "crown-star-magic-tea",
  title: "Crown Star-Magic Tea",
  description:
    "Increase Magicka Recovery by 565 for 2.5 hours.\nThese effects are scaled based on your level, up to Veteran Rank 10.",
  icon: "/esoui/art/icons/store_magickadrink_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 64498,
  itemIds: [64498],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 565 }],
  status: "supported",
  hashPlace: 304,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
