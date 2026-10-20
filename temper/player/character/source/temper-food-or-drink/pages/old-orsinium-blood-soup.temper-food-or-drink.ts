import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const oldOrsiniumBloodSoup = {
  id: "01a15a12-c8b6-783c-9f10-6880e47e08e7",
  type: "page-type/temper-food-or-drink",
  slug: "old-orsinium-blood-soup",
  title: "Old Orsinium Blood Soup",
  description: "Increase Max Health by 6773 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_003.dds",
  foodOrDrinkKind: "food",
  itemId: 64470,
  itemIds: [64470],
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 6773 }],
  status: "supported",
  hashPlace: 299,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
