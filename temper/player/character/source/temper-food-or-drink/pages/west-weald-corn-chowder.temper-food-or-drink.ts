import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const westWealdCornChowder = {
  id: "01a15a12-c8c2-7fb3-9ae7-ea54a4fb375c",
  type: "page-type/temper-food-or-drink",
  slug: "west-weald-corn-chowder",
  title: "West Weald Corn Chowder",
  description: "Increase Max Stamina by 4536 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_soup_002.dds",
  foodOrDrinkKind: "food",
  itemId: 32160,
  itemIds: [32160, 57115, 57116],
  seconds: 3960,
  level: "CP10",
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4536 }],
  status: "supported",
  hashPlace: 182,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
