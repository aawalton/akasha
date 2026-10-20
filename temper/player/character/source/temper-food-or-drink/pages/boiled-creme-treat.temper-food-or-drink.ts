import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const boiledCremeTreat = {
  id: "01a15a12-c898-7f0a-8db3-cb78fcc40c96",
  type: "page-type/temper-food-or-drink",
  slug: "boiled-creme-treat",
  title: "Boiled Creme Treat",
  description: "Increase Max Magicka and Stamina by 4635 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_003.dds",
  foodOrDrinkKind: "food",
  itemId: 57150,
  itemIds: [57150, 57151, 57152],
  seconds: 5400,
  level: "CP100",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4635 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4635 },
  ],
  status: "supported",
  hashPlace: 263,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
