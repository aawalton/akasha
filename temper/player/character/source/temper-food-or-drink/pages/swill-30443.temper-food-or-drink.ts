import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill30443 = {
  id: "01a15a12-c8be-7099-a292-629a4e207d35",
  type: "page-type/temper-food-or-drink",
  slug: "swill-30443",
  title: "Swill",
  description: "Increase Stamina Recovery by 75 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 30443,
  itemIds: [30443, 30455, 37778, 37826],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 75 }],
  status: "supported",
  hashPlace: 132,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
