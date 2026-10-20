import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ginsengTonic = {
  id: "01a15a12-c8af-7950-9b7e-6c88ae486638",
  type: "page-type/temper-food-or-drink",
  slug: "ginseng-tonic",
  title: "Ginseng Tonic",
  description: "Increase Stamina Recovery by 105 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28485,
  itemIds: [28485, 32069, 32081, 33702, 34035, 37784, 37832, 37880, 37928],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 105 }],
  status: "supported",
  hashPlace: 107,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
