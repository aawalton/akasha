import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jasmineTea = {
  id: "01a15a12-c8b2-7ed7-a207-037560a787f7",
  type: "page-type/temper-food-or-drink",
  slug: "jasmine-tea",
  title: "Jasmine Tea",
  description: "Increase Magicka Recovery by 68 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28441,
  itemIds: [28441, 33648, 33981],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 68 }],
  status: "supported",
  hashPlace: 84,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
