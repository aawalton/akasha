import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill32117 = {
  id: "01a15a12-c8be-70d8-b7ef-80f701e97565",
  type: "page-type/temper-food-or-drink",
  slug: "swill-32117",
  title: "Swill",
  description: "Increase Stamina Recovery by 264 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 32117,
  itemIds: [32117, 32129],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 264 }],
  status: "supported",
  hashPlace: 162,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
