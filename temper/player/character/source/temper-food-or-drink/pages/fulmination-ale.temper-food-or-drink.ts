import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const fulminationAle = {
  id: "01a15a12-c8ae-7359-a65c-d86b8bebca4a",
  type: "page-type/temper-food-or-drink",
  slug: "fulmination-ale",
  title: "Fulmination Ale",
  description: "Increase Health Recovery by 269 and Stamina Recovery by 246 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28468,
  itemIds: [28468, 33687, 34020],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 269 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 246 },
  ],
  status: "supported",
  hashPlace: 98,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
