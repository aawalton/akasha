import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37884 = {
  id: "01a15a12-c8bf-7993-9c6b-13663c992816",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37884",
  title: "Swill",
  description: "Increase Health Recovery by 165 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37884,
  itemIds: [37884, 37932],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 165 }],
  status: "supported",
  hashPlace: 242,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
