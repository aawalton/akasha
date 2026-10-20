import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownStaunchnessStew = {
  id: "01a15a12-c8aa-7633-b977-715184416486",
  type: "page-type/temper-food-or-drink",
  slug: "crown-staunchness-stew",
  title: "Crown Staunchness Stew",
  description:
    "Increase Max Stamina by 5656 for 2.5 hours.\nThese effects are scaled based on your level, up to Veteran Rank 10.",
  icon: "/esoui/art/icons/store_staminafood_001.dds",
  foodOrDrinkKind: "food",
  itemId: 64496,
  itemIds: [64496],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 5656 }],
  status: "supported",
  hashPlace: 302,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
