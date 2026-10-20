import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const murkyThrassianChai = {
  id: "01a15a12-c8b5-76f3-a957-754f4fa8ae8f",
  type: "page-type/temper-food-or-drink",
  slug: "murky-thrassian-chai",
  title: "murky Thrassian Chai",
  description: "Increase Magicka Recovery by 210 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 32146,
  itemIds: [32146, 32158, 37801, 37849, 37897, 37945],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 210 }],
  status: "supported",
  hashPlace: 178,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
