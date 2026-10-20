import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jasmineTea30440 = {
  id: "01a15a12-c8b2-7377-b89e-b164c8a79049",
  type: "page-type/temper-food-or-drink",
  slug: "jasmine-tea-30440",
  title: "Jasmine Tea",
  description: "Increase Magicka Recovery by 35 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 30440,
  itemIds: [30440, 30452, 37771, 37819, 37867, 37915],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 35 }],
  status: "supported",
  hashPlace: 129,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
