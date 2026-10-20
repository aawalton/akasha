import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const skyrimJazbayCrostata = {
  id: "01a15a12-c8ba-7319-9b45-d460a83892f4",
  type: "page-type/temper-food-or-drink",
  slug: "skyrim-jazbay-crostata",
  title: "Skyrim Jazbay Crostata",
  description: "Increase Max Magicka by 3704 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dessert_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33909,
  itemIds: [33909, 57086, 57087],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3704 }],
  status: "supported",
  hashPlace: 220,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
