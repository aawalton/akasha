import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicFieldTea = {
  id: "01a15a12-c8ac-7c01-abd6-ba2524b8ef51",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-field-tea",
  title: "Cyrodilic Field Tea",
  description: "Increase Health Recovery by 0 and Magicka Recovery by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 71078,
  itemIds: [71078],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 316,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
