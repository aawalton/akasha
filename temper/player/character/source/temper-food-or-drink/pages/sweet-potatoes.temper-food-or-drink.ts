import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetPotatoes = {
  id: "01a15a12-c8bd-7ecf-aa3a-b78f1c758078",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-potatoes",
  title: "Sweet Potatoes",
  description: "Increase Max Magicka and Stamina by 1264 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_vendor_fuel_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28308,
  itemIds: [28308, 28357, 33405],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 1264 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1264 },
  ],
  status: "supported",
  hashPlace: 45,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
