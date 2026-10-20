import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sippingImgaTonic = {
  id: "01a15a12-c8ba-76e5-aeb4-fbaf4a4a3503",
  type: "page-type/temper-food-or-drink",
  slug: "sipping-imga-tonic",
  title: "Sipping Imga Tonic",
  description: "Increase Stamina Recovery by 506 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 33698,
  itemIds: [33698, 46063, 57196],
  seconds: 3960,
  level: "CP50",
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 506 }],
  status: "supported",
  hashPlace: 208,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
