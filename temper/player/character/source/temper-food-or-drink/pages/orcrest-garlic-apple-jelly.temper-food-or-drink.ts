import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const orcrestGarlicAppleJelly = {
  id: "01a15a12-c8b6-76b7-9685-a18f82ba3aed",
  type: "page-type/temper-food-or-drink",
  slug: "orcrest-garlic-apple-jelly",
  title: "Orcrest Garlic Apple Jelly",
  description: "Increase Max Magicka by 4536 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_jam_pot.dds",
  foodOrDrinkKind: "food",
  itemId: 43094,
  itemIds: [43094, 57112, 57113],
  seconds: 3960,
  level: "CP10",
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4536 }],
  status: "supported",
  hashPlace: 247,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
