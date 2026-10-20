import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const consummateSweetRoll = {
  id: "01a15a12-c8a9-7aad-bbd3-26c183e264e4",
  type: "page-type/temper-food-or-drink",
  slug: "consummate-sweet-roll",
  title: "Consummate Sweet Roll",
  description: "Increase Max Health, Magicka and Stamina by 0 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_sweet_roll.dds",
  foodOrDrinkKind: "food",
  itemId: 33375,
  itemIds: [33375],
  seconds: 9000,
  status: "unsupported",
  hashPlace: 183,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
