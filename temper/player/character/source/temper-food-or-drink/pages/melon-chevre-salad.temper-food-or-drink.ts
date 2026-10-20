import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const melonChevreSalad = {
  id: "01a15a12-c8b3-785b-8398-2545f9730cdc",
  type: "page-type/temper-food-or-drink",
  slug: "melon-chevre-salad",
  title: "Melon-Chevre Salad",
  description: "Increase Max Magicka by 4082 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_003.dds",
  foodOrDrinkKind: "food",
  itemId: 33927,
  itemIds: [33927, 57099, 57100],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4082 }],
  status: "supported",
  hashPlace: 226,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
