import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cyrodilicFieldBrew = {
  id: "01a15a12-c8ac-7d29-9e96-fdbaf778c2a9",
  type: "page-type/temper-food-or-drink",
  slug: "cyrodilic-field-brew",
  title: "Cyrodilic Field Brew",
  description: "Increase Health Recovery by 0 and Stamina Recovery by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 71077,
  itemIds: [71077],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 315,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
