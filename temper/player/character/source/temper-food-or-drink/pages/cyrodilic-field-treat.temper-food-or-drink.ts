import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicFieldTreat = {
  id: "01a15a12-c8ac-7374-bd37-7e87801aef14",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-field-treat",
  title: "Cyrodilic Field Treat",
  description: "Increase Max Health by 0 and Max Magicka by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cake_005.dds",
  foodOrDrinkKind: "food",
  itemId: 71075,
  itemIds: [71075],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 313,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
