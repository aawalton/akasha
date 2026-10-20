import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const murkySourflowerTea = {
  id: "01a15a12-c8b4-71ed-96a1-a856c33ca9dc",
  type: "page-type/temper-food-or-drink",
  slug: "murky-sourflower-tea",
  title: "murky Sourflower Tea",
  description: "Increase Magicka Recovery by 140 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 32074,
  itemIds: [32074, 32086, 37789, 37837, 37885, 37933],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 140 }],
  status: "supported",
  hashPlace: 145,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
