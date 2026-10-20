import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const milletStuffedPorkLoin = {
  id: "01a15a12-c8b3-7b66-b6d4-81f16c556d6c",
  type: "page-type/temper-food-or-drink",
  slug: "millet-stuffed-pork-loin",
  title: "Millet-Stuffed Pork Loin",
  description: "Increase Max Health by 4956 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 43088,
  itemIds: [43088, 57111, 57114],
  seconds: 3960,
  level: "CP10",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 4956 }],
  status: "supported",
  hashPlace: 245,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
