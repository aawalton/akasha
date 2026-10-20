import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleSweetroll = {
  id: "01a15a12-c8bc-7a98-b795-cabf3f6c6e64",
  type: "page-type/temper-food-or-drink",
  slug: "stale-sweetroll",
  title: "Stale Sweetroll",
  description: "Increase Max Magicka by 0 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_sweet_roll.dds",
  foodOrDrinkKind: "food",
  itemId: 74721,
  itemIds: [74721, 94210],
  seconds: 3960,
  status: "unsupported",
  hashPlace: 322,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
