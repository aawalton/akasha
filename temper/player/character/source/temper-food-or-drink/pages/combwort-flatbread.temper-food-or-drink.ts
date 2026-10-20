import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const combwortFlatbread = {
  id: "01a15a12-c8a7-7e77-9c58-b125e0147621",
  type: "page-type/temper-food-or-drink",
  slug: "combwort-flatbread",
  title: "Combwort Flatbread",
  description: "Increase Max Magicka by 4410 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dessert_003.dds",
  foodOrDrinkKind: "food",
  itemId: 61084,
  itemIds: [61084],
  seconds: 3960,
  level: "CP50",
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4410 }],
  status: "supported",
  hashPlace: 295,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
