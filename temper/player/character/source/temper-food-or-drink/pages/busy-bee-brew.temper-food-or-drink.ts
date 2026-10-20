import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const busyBeeBrew = {
  id: "01a15a12-c89a-7f0d-8a98-8fd56ae5c7c5",
  type: "page-type/temper-food-or-drink",
  slug: "busy-bee-brew",
  title: "Busy Bee Brew",
  description: "Increase Stamina Recovery by 257 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28501,
  itemIds: [28501, 33726, 34059],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 257 }],
  status: "supported",
  hashPlace: 115,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
