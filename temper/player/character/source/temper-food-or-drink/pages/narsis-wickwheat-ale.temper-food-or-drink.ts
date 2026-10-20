import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const narsisWickwheatAle = {
  id: "01a15a12-c8b5-76bf-a35f-14190b8f7936",
  type: "page-type/temper-food-or-drink",
  slug: "narsis-wickwheat-ale",
  title: "Narsis Wickwheat Ale",
  description: "Increase Health Recovery by 368 and Stamina Recovery by 337 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28487,
  itemIds: [28487, 57177, 57178],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 368 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 337 },
  ],
  status: "supported",
  hashPlace: 108,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
