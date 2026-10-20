import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldPotatoRiceBlintzes = {
  id: "01a15a12-c8a6-7011-a903-6ad449472fbd",
  type: "page-type/temper-food-or-drink",
  slug: "cold-potato-rice-blintzes",
  title: "cold Potato Rice Blintzes",
  description: "Increase Max Stamina by 2100 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dessert_002.dds",
  foodOrDrinkKind: "food",
  itemId: 32094,
  itemIds: [32094, 32106, 37803, 37851, 37899, 37947],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 2100 }],
  status: "supported",
  hashPlace: 153,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
