import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const spicyBeetSalad = {
  id: "01a15a12-c8bb-7ba0-b9fb-5406bde603c5",
  type: "page-type/temper-food-or-drink",
  slug: "spicy-beet-salad",
  title: "Spicy Beet Salad",
  description: "Increase Max Stamina by 1814 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_002.dds",
  foodOrDrinkKind: "food",
  itemId: 28309,
  itemIds: [28309, 28382, 42811],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1814 }],
  status: "supported",
  hashPlace: 46,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
