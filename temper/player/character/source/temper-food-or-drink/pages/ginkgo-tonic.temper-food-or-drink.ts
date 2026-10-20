import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ginkgoTonic = {
  id: "01a15a12-c8af-7d30-8615-a342c10b5ebd",
  type: "page-type/temper-food-or-drink",
  slug: "ginkgo-tonic",
  title: "Ginkgo Tonic",
  description: "Increase Stamina Recovery by 68 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28481,
  itemIds: [28481, 33696, 34029],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 68 }],
  status: "supported",
  hashPlace: 104,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
