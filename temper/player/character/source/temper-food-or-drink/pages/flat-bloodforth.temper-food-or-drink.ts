import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const flatBloodforth = {
  id: "01a15a12-c8ad-70b7-8f95-ebea2f9d75cf",
  type: "page-type/temper-food-or-drink",
  slug: "flat-bloodforth",
  title: "Flat Bloodforth",
  description: "Increase Health Recovery by 346 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 32139,
  itemIds: [32139, 32151, 61035, 61056, 61057],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 346 }],
  status: "supported",
  hashPlace: 172,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
