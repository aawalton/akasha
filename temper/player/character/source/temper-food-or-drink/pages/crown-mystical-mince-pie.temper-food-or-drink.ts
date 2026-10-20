import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownMysticalMincePie = {
  id: "01a15a12-c8aa-7a15-988a-1fc34510e309",
  type: "page-type/temper-food-or-drink",
  slug: "crown-mystical-mince-pie",
  title: "Crown Mystical Mince Pie",
  description:
    "Increase Max Magicka by 5656 for 2.5 hours.\nThese effects are scaled based on your level, up to Veteran Rank 10.",
  icon: "/esoui/art/icons/store_magickafood_001.dds",
  foodOrDrinkKind: "food",
  itemId: 64495,
  itemIds: [64495],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 5656 }],
  status: "supported",
  hashPlace: 301,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
