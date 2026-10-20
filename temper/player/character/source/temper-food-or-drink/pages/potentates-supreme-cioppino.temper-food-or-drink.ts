import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const potentatesSupremeCioppino = {
  id: "01a15a12-c8b7-76d4-9f97-e15089e1ad2a",
  type: "page-type/temper-food-or-drink",
  slug: "potentates-supreme-cioppino",
  title: "Potentate's Supreme Cioppino",
  description: "Increase Max Health by 4200 and Max Magicka and Max Stamina by 3864 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_soup_004.dds",
  foodOrDrinkKind: "food",
  itemId: 33898,
  itemIds: [33898, 43089, 43143, 57153],
  seconds: 9000,
  level: "CP100",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4200 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3864 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3864 },
  ],
  status: "supported",
  hashPlace: 216,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
