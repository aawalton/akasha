import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const summerSundasSoup = {
  id: "01a15a12-c8bc-7464-8176-78ac1629371e",
  type: "page-type/temper-food-or-drink",
  slug: "summer-sundas-soup",
  title: "Summer Sundas Soup",
  description: "Increase Max Magicka by 3150 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 61040,
  itemIds: [61040],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3150 }],
  status: "supported",
  hashPlace: 294,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
