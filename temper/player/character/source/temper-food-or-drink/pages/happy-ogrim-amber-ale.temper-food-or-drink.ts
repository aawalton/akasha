import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const happyOgrimAmberAle = {
  id: "01a15a12-c8b0-7954-b7fd-bf97118de7b8",
  type: "page-type/temper-food-or-drink",
  slug: "happy-ogrim-amber-ale",
  title: "Happy Ogrim Amber Ale",
  description: "Increase Health Recovery by 506 and Stamina Recovery by 463 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 57212,
  itemIds: [57212, 57213, 57214],
  seconds: 5400,
  level: "CP100",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 506 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 463 },
  ],
  status: "supported",
  hashPlace: 271,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
