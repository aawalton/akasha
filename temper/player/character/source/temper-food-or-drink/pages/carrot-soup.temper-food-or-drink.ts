import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const carrotSoup = {
  id: "01a15a12-c89a-7b2a-ba96-59487236f9d3",
  type: "page-type/temper-food-or-drink",
  slug: "carrot-soup",
  title: "Carrot Soup",
  description: "Increase Max Stamina by 680 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 28321,
  itemIds: [28321, 28354, 33813],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 680 }],
  status: "supported",
  hashPlace: 52,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
