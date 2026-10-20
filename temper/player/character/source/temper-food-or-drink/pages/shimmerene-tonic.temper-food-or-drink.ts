import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const shimmereneTonic = {
  id: "01a15a12-c8ba-7d6b-9b91-2c0695a61d78",
  type: "page-type/temper-food-or-drink",
  slug: "shimmerene-tonic",
  title: "Shimmerene Tonic",
  description: "Increase Stamina Recovery by 408 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28517,
  itemIds: [28517, 57174, 57175],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 408 }],
  status: "supported",
  hashPlace: 125,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
