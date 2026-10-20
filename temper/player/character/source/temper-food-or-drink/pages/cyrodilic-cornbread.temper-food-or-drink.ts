import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicCornbread = {
  id: "01a15a12-c8ab-7d24-9229-256e04b29fff",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-cornbread",
  title: "Cyrodilic Cornbread",
  description: "Increase Max Stamina by 3704 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bread_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33897,
  itemIds: [33897, 57089, 57090],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3704 }],
  status: "supported",
  hashPlace: 215,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
