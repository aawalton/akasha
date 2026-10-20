import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const camlornSweetBrownAle = {
  id: "01a0e05d-1464-7c49-b2a7-adff345f903a",
  type: "page-type/temper-food-or-drink",
  slug: "camlorn-sweet-brown-ale",
  title: "Camlorn Sweet Brown Ale",
  description: "Increase Health Recovery by 539 and Stamina Recovery by 493 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 68268,
  itemIds: [68267, 68268, 68269],
  abilityId: 72965,
  seconds: 5400,
  level: "CP150",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 539 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 493 },
  ],
  status: "supported",
  hashPlace: 22,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
