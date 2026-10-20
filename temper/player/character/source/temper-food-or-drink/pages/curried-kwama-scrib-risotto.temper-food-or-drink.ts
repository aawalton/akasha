import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const curriedKwamaScribRisotto = {
  id: "01a15a12-c8ab-7c86-95eb-76d5e6024348",
  type: "page-type/temper-food-or-drink",
  slug: "curried-kwama-scrib-risotto",
  title: "Curried Kwama Scrib Risotto",
  description: "Increase Max Health by 4312 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_001.dds",
  foodOrDrinkKind: "food",
  itemId: 57628,
  itemIds: [57628, 57634],
  seconds: 3960,
  level: "CP10",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 4312 }],
  status: "supported",
  hashPlace: 274,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
