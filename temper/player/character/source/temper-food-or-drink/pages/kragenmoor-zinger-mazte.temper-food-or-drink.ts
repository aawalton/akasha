import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const kragenmoorZingerMazte = {
  id: "01a15a12-c8b2-721e-8eda-91f6d74432b9",
  type: "page-type/temper-food-or-drink",
  slug: "kragenmoor-zinger-mazte",
  title: "Kragenmoor Zinger Mazte",
  description: "Increase Health Recovery by 585 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 71249,
  itemIds: [71249],
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 585 }],
  status: "supported",
  hashPlace: 318,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
