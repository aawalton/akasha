import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tanethCoffee = {
  id: "01a15a12-c8bf-7b93-a214-6376322d6051",
  type: "page-type/temper-food-or-drink",
  slug: "taneth-coffee",
  title: "Taneth Coffee",
  description: "Increase Stamina Recovery by 219 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 28497,
  itemIds: [28497, 33720, 34053],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 219 }],
  status: "supported",
  hashPlace: 113,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
