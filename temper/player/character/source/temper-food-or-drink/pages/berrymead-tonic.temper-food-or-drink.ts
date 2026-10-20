import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const berrymeadTonic = {
  id: "01a15a12-c896-770f-bd4d-be6a136191b4",
  type: "page-type/temper-food-or-drink",
  slug: "berrymead-tonic",
  title: "Berrymead Tonic",
  description: "Increase Stamina Recovery by 294 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28505,
  itemIds: [28505, 33732, 34065],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 294 }],
  status: "supported",
  hashPlace: 117,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
