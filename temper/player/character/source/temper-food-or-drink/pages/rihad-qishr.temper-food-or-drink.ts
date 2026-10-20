import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const rihadQishr = {
  id: "01a15a12-c8b9-75b0-9722-e6600b46655a",
  type: "page-type/temper-food-or-drink",
  slug: "rihad-qishr",
  title: "Rihad Qishr",
  description: "Increase Stamina Recovery by 332 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28509,
  itemIds: [28509, 33738, 34071],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 332 }],
  status: "supported",
  hashPlace: 119,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
