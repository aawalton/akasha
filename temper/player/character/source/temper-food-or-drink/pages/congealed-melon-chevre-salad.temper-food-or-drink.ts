import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedMelonChevreSalad = {
  id: "01a15a12-c8a8-74a8-88bd-93373bbc3331",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-melon-chevre-salad",
  title: "congealed Melon-Chevre Salad",
  description: "Increase Max Magicka by 3500 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 32144,
  itemIds: [32144, 32156, 57621],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3500 }],
  status: "supported",
  hashPlace: 177,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
