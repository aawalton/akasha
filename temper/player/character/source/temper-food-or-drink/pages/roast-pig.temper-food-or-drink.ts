import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const roastPig = {
  id: "01a15a12-c8b9-7cbf-add1-a420f30f1311",
  type: "page-type/temper-food-or-drink",
  slug: "roast-pig",
  title: "Roast Pig",
  description: "Increase Max Health by 743 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28358,
  itemIds: [28358, 33526, 33819],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 743 }],
  status: "supported",
  hashPlace: 61,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
