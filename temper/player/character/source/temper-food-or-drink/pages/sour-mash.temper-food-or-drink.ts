import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sourMash = {
  id: "01a15a12-c8bb-7738-b35a-21b7760ae4e4",
  type: "page-type/temper-food-or-drink",
  slug: "sour-mash",
  title: "Sour Mash",
  description: "Increase Health Recovery by 322 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28425,
  itemIds: [28425, 33636, 33969],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 322 }],
  status: "supported",
  hashPlace: 76,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
