import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const redDeerStew = {
  id: "01a15a12-c8b8-7504-acf8-781b69ab4dab",
  type: "page-type/temper-food-or-drink",
  slug: "red-deer-stew",
  title: "Red Deer Stew",
  description: "Increase Max Health by 1381 and Max Magicka by 1264 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 28299,
  itemIds: [28299, 28348, 28373],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 1381 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 1264 },
  ],
  status: "supported",
  hashPlace: 41,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
