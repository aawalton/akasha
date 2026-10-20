import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const lemonicInvigoration = {
  id: "01a15a12-c8b3-7230-94ac-2867d8f01fb9",
  type: "page-type/temper-food-or-drink",
  slug: "lemonic-invigoration",
  title: "Lemonic Invigoration",
  description: "Increase Stamina Recovery by 350 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_wooden_flask_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 57651,
  itemIds: [57651, 61065, 61066],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 350 }],
  status: "supported",
  hashPlace: 288,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
