import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicFieldBar = {
  id: "01a15a12-c8ac-76e7-b947-ee6af2fa151e",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-field-bar",
  title: "Cyrodilic Field Bar",
  description: "Increase Max Stamina by 0 and Max Magicka by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_bread_001.dds",
  foodOrDrinkKind: "food",
  itemId: 71076,
  itemIds: [71076],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 314,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
