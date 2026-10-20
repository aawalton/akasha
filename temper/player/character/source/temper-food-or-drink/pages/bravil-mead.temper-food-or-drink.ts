import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bravilMead = {
  id: "01a15a12-c898-77f2-8f49-c3ed868117dc",
  type: "page-type/temper-food-or-drink",
  slug: "bravil-mead",
  title: "Bravil Mead",
  description: "Increase Health Recovery by 203 and Stamina Recovery by 186 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28460,
  itemIds: [28460, 33675, 34008],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 203 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 186 },
  ],
  status: "supported",
  hashPlace: 93,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
