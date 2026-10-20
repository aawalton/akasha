import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const spinnersTabooSalad = {
  id: "01a15a12-c8bb-7f57-bae4-944e5cdfc322",
  type: "page-type/temper-food-or-drink",
  slug: "spinners-taboo-salad",
  title: "Spinner's Taboo Salad",
  description: "Increase Max Magicka and Stamina by 3070 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 54377,
  itemIds: [54377, 57095, 57096],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3070 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3070 },
  ],
  status: "supported",
  hashPlace: 254,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
