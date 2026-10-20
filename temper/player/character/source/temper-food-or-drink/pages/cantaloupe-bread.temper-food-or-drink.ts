import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cantaloupeBread = {
  id: "01a15a12-c89a-7b48-bac7-89495168bd78",
  type: "page-type/temper-food-or-drink",
  slug: "cantaloupe-bread",
  title: "Cantaloupe Bread",
  description: "Increase Max Magicka by 2570 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_french_loaf.dds",
  foodOrDrinkKind: "food",
  itemId: 33508,
  itemIds: [33508, 33569, 33867],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2570 }],
  status: "supported",
  hashPlace: 194,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
