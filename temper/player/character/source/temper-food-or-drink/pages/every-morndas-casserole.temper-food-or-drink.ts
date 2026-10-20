import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const everyMorndasCasserole = {
  id: "01a15a12-c8ad-740a-87cc-8410e0e6e88a",
  type: "page-type/temper-food-or-drink",
  slug: "every-morndas-casserole",
  title: "Every-Morndas Casserole",
  description: "Increase Max Magicka and Stamina by 4153 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 43155,
  itemIds: [43155, 57133, 57134],
  seconds: 5400,
  level: "CP50",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4153 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4153 },
  ],
  status: "supported",
  hashPlace: 252,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
