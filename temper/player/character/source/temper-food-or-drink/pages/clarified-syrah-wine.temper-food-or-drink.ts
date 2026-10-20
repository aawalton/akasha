import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const clarifiedSyrahWine = {
  id: "01a15a12-c89b-7a09-a64b-a62e03a29e10",
  type: "page-type/temper-food-or-drink",
  slug: "clarified-syrah-wine",
  title: "Clarified Syrah Wine",
  description: "Increase Health Recovery by 156 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28409,
  itemIds: [28409, 33612, 33945],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 156 }],
  status: "supported",
  hashPlace: 67,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
