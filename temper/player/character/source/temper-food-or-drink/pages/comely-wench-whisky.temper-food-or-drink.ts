import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const comelyWenchWhisky = {
  id: "01a15a12-c8a7-71d3-9a52-05ee664135bb",
  type: "page-type/temper-food-or-drink",
  slug: "comely-wench-whisky",
  title: "Comely Wench Whisky",
  description: "Increase Health Recovery by 431 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 57640,
  itemIds: [57640, 61067, 61068],
  seconds: 3960,
  level: "CP10",
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 431 }],
  status: "supported",
  hashPlace: 281,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
