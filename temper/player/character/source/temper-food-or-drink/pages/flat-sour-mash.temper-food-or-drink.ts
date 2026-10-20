import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const flatSourMash = {
  id: "01a15a12-c8ad-7fbf-abbf-4fde153dca50",
  type: "page-type/temper-food-or-drink",
  slug: "flat-sour-mash",
  title: "flat Sour Mash",
  description: "Increase Health Recovery by 269 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 32115,
  itemIds: [32115, 32127, 37902, 37950, 61053],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 269 }],
  status: "supported",
  hashPlace: 160,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
