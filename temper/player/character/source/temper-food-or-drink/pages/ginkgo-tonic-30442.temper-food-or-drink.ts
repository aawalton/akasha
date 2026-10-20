import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ginkgoTonic30442 = {
  id: "01a15a12-c8af-73bd-a35f-812281c95a77",
  type: "page-type/temper-food-or-drink",
  slug: "ginkgo-tonic-30442",
  title: "Ginkgo Tonic",
  description: "Increase Stamina Recovery by 35 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 30442,
  itemIds: [30442, 30454, 37772, 37820, 61043],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 35 }],
  status: "supported",
  hashPlace: 131,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
