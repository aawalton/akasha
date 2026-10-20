import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sippingImgaTonic57653 = {
  id: "01a15a12-c8ba-79d7-9f36-2044d57620d7",
  type: "page-type/temper-food-or-drink",
  slug: "sipping-imga-tonic-57653",
  title: "Sipping Imga Tonic",
  description: "Increase Stamina Recovery by 441 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57653,
  itemIds: [57653, 61077, 61078],
  seconds: 3960,
  level: "CP50",
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 441 }],
  status: "supported",
  hashPlace: 290,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
