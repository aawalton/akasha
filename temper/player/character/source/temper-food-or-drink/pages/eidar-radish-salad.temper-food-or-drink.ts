import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const eidarRadishSalad = {
  id: "01a15a12-c8ac-7639-8f98-2decbea389d6",
  type: "page-type/temper-food-or-drink",
  slug: "eidar-radish-salad",
  title: "Eidar Radish Salad",
  description: "Increase Max Stamina by 2570 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33496,
  itemIds: [33496, 33557, 42784],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2570 }],
  status: "supported",
  hashPlace: 190,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
