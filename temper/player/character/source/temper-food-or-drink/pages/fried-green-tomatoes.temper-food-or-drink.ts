import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const friedGreenTomatoes = {
  id: "01a15a12-c8ae-745d-9e21-31bbdd71af2d",
  type: "page-type/temper-food-or-drink",
  slug: "fried-green-tomatoes",
  title: "Fried Green Tomatoes",
  description: "Increase Max Magicka by 1814 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_vendor_fuel_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28317,
  itemIds: [28317, 28390, 33855],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1814 }],
  status: "supported",
  hashPlace: 50,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
