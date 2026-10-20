import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sunDriedCaravanProvisions = {
  id: "01a15a12-c8bd-7205-ae0a-8a260eb2fae1",
  type: "page-type/temper-food-or-drink",
  slug: "sun-dried-caravan-provisions",
  title: "Sun-Dried Caravan Provisions",
  description: "Increase Max Magicka and Stamina by 3371 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_vegetables.dds",
  foodOrDrinkKind: "food",
  itemId: 33916,
  itemIds: [33916, 57108, 57109],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3371 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3371 },
  ],
  status: "supported",
  hashPlace: 223,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
