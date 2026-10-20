import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const roastCorn = {
  id: "01a15a12-c8b9-76f4-84b6-aa0431b3cd1f",
  type: "page-type/temper-food-or-drink",
  slug: "roast-corn",
  title: "Roast Corn",
  description: "Increase Max Stamina by 350 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_002.dds",
  foodOrDrinkKind: "food",
  itemId: 30444,
  itemIds: [30444, 30456, 37773, 37821, 37869, 37917],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 350 }],
  status: "supported",
  hashPlace: 133,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
