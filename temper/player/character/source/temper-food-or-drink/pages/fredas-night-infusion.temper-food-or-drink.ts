import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const fredasNightInfusion = {
  id: "01a15a12-c8ae-7a57-bbb1-bd4832f92e8a",
  type: "page-type/temper-food-or-drink",
  slug: "fredas-night-infusion",
  title: "Fredas Night Infusion",
  description: "Increase Stamina Recovery by 532 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 71251,
  itemIds: [71251],
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 532 }],
  status: "supported",
  hashPlace: 320,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
