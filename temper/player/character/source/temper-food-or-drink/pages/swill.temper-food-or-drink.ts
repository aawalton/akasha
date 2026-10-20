import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill = {
  id: "01a15a12-c8bf-7739-aceb-546090ff805a",
  type: "page-type/temper-food-or-drink",
  slug: "swill",
  title: "Swill",
  description: "Increase Health Recovery by 82 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 30439,
  itemIds: [30439, 30451],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 82 }],
  status: "supported",
  hashPlace: 128,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
