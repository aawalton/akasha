import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const freshApplesAndEidarCheese = {
  id: "01a15a12-c8ae-784e-897f-76b6bd8a958c",
  type: "page-type/temper-food-or-drink",
  slug: "fresh-apples-and-eidar-cheese",
  title: "Fresh Apples and Eidar Cheese",
  description: "Increase Max Magicka by 5065 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_apples.dds",
  foodOrDrinkKind: "food",
  itemId: 43154,
  itemIds: [43154, 57124, 57125],
  seconds: 3960,
  level: "CP50",
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 5065 }],
  status: "supported",
  hashPlace: 251,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
