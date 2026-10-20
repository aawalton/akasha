import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const nutBrownAle30438 = {
  id: "01a15a12-c8b6-721e-9695-8219a1416d33",
  type: "page-type/temper-food-or-drink",
  slug: "nut-brown-ale-30438",
  title: "Nut Brown Ale",
  description: "Increase Health Recovery by 38 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 30438,
  itemIds: [30438, 30450, 37770, 37818, 37866, 37914],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 38 }],
  status: "supported",
  hashPlace: 127,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
