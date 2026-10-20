import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownHeartyHealthHash = {
  id: "01a15a12-c8aa-75a6-894d-70abd8c74a8d",
  type: "page-type/temper-food-or-drink",
  slug: "crown-hearty-health-hash",
  title: "Crown Hearty Health Hash",
  description:
    "Increase Max Health by 6216 for 2.5 hours.\nThese effects are scaled based on your level, up to Veteran Rank 10.",
  icon: "/esoui/art/icons/store_healthfood_001.dds",
  foodOrDrinkKind: "food",
  itemId: 64494,
  itemIds: [64494],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 6216 }],
  status: "supported",
  hashPlace: 300,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
