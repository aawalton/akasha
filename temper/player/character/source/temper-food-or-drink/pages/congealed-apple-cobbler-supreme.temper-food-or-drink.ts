import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedAppleCobblerSupreme = {
  id: "01a15a12-c8a8-7b0d-9881-8cf743300c02",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-apple-cobbler-supreme",
  title: "congealed Apple Cobbler Supreme",
  description: "Increase Max Magicka by 2800 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 32126,
  itemIds: [32126, 32138, 37817, 37865, 37913, 37961],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2800 }],
  status: "supported",
  hashPlace: 170,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
