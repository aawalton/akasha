import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37890 = {
  id: "01a15a12-c8bf-75cf-81f6-8add61f5b2bd",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37890",
  title: "Swill",
  description: "Increase Health Recovery by 206 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37890,
  itemIds: [37890, 37938],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 206 }],
  status: "supported",
  hashPlace: 243,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
