import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicFieldTonic = {
  id: "01a15a12-c8ac-70b3-b2a4-d68d4c06edd4",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-field-tonic",
  title: "Cyrodilic Field Tonic",
  description: "Increase Magicka Recovery by 0 and Stamina Recovery by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 71079,
  itemIds: [71079],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 317,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
