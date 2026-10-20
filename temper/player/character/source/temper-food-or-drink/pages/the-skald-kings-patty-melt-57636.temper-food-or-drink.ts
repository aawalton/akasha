import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const theSkaldKingsPattyMelt57636 = {
  id: "01a15a12-c8c0-7691-8eb3-5cbb2da01cf1",
  type: "page-type/temper-food-or-drink",
  slug: "the-skald-kings-patty-melt-57636",
  title: "The Skald-King's Patty Melt",
  description: "Increase Max Health by 5467 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_003.dds",
  foodOrDrinkKind: "food",
  itemId: 57636,
  itemIds: [57636],
  seconds: 3960,
  level: "CP100",
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5467 }],
  status: "supported",
  hashPlace: 278,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
