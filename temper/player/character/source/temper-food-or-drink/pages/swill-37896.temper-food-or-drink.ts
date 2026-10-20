import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37896 = {
  id: "01a15a12-c8bf-773e-9722-ecaee72e8436",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37896",
  title: "Swill",
  description: "Increase Health Recovery by 247 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37896,
  itemIds: [37896, 37944],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 247 }],
  status: "supported",
  hashPlace: 244,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
