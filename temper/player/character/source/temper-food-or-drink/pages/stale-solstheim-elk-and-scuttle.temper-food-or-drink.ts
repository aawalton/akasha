import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleSolstheimElkAndScuttle = {
  id: "01a15a12-c8bc-75f5-bba2-efd26629e4dc",
  type: "page-type/temper-food-or-drink",
  slug: "stale-solstheim-elk-and-scuttle",
  title: "stale Solstheim Elk and Scuttle",
  description: "Increase Max Health by 3850 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 32149,
  itemIds: [32149, 32161, 57633],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 3850 }],
  status: "supported",
  hashPlace: 180,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
