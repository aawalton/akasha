import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicFieldTack = {
  id: "01a15a12-c8ac-70ef-913e-63595c58d29f",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-field-tack",
  title: "Cyrodilic Field Tack",
  description: "Increase Max Health by 0 and Max Stamina by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_bread_002.dds",
  foodOrDrinkKind: "food",
  itemId: 71074,
  itemIds: [71074],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 312,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
