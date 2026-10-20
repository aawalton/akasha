import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tonsilTingleTonic = {
  id: "01a15a12-c8c1-774b-bcfb-a06e18a3f54e",
  type: "page-type/temper-food-or-drink",
  slug: "tonsil-tingle-tonic",
  title: "Tonsil Tingle Tonic",
  description: "Increase Stamina Recovery by 143 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28489,
  itemIds: [28489, 33708, 34041],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 143 }],
  status: "supported",
  hashPlace: 109,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
