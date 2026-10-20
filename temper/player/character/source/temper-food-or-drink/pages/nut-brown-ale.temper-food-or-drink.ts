import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const nutBrownAle = {
  id: "01a15a12-c8b6-7d10-9683-c63bd8a359c1",
  type: "page-type/temper-food-or-drink",
  slug: "nut-brown-ale",
  title: "Nut Brown Ale",
  description: "Increase Health Recovery by 74 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_beer_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28401,
  itemIds: [28401, 33600, 33933],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 74 }],
  status: "supported",
  hashPlace: 63,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
