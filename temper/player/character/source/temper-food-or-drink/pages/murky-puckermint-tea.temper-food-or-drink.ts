import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const murkyPuckermintTea = {
  id: "01a15a12-c8b4-7068-9528-c7da0e1b655b",
  type: "page-type/temper-food-or-drink",
  slug: "murky-puckermint-tea",
  title: "murky Puckermint Tea",
  description: "Increase Magicka Recovery by 280 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 32122,
  itemIds: [32122, 32134, 37813, 37861, 37909, 37957],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 280 }],
  status: "supported",
  hashPlace: 166,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
