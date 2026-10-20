import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tomatoBorscht = {
  id: "01a15a12-c8c1-7bd1-84ae-ef09922cfc25",
  type: "page-type/temper-food-or-drink",
  slug: "tomato-borscht",
  title: "Tomato Borscht",
  description: "Increase Max Magicka and Stamina by 1565 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_003.dds",
  foodOrDrinkKind: "food",
  itemId: 28320,
  itemIds: [28320, 33411, 33531],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1565 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1565 },
  ],
  status: "supported",
  hashPlace: 51,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
