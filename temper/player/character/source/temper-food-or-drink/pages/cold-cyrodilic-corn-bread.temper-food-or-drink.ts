import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldCyrodilicCornBread = {
  id: "01a15a12-c8a6-7004-85b3-4703d242d48d",
  type: "page-type/temper-food-or-drink",
  slug: "cold-cyrodilic-corn-bread",
  title: "cold Cyrodilic Corn Bread",
  description: "Increase Max Stamina by 3150 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bread_001.dds",
  foodOrDrinkKind: "food",
  itemId: 32124,
  itemIds: [32124, 32136],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3150 }],
  status: "supported",
  hashPlace: 168,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
