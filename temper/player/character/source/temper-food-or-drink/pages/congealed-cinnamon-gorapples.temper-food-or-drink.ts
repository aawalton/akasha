import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedCinnamonGorapples = {
  id: "01a15a12-c8a8-77a3-a8cf-c42c2d6c5c3c",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-cinnamon-gorapples",
  title: "congealed Cinnamon Gorapples",
  description: "Increase Max Magicka by 2100 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_apples.dds",
  foodOrDrinkKind: "food",
  itemId: 37805,
  itemIds: [37805, 37853, 37901, 37949],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2100 }],
  status: "supported",
  hashPlace: 236,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
