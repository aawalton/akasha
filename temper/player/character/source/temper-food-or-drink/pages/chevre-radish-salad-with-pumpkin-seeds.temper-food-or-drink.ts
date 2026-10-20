import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const chevreRadishSaladWithPumpkinSeeds = {
  id: "01a15a12-c89a-7062-b757-fe6f18ed323d",
  type: "page-type/temper-food-or-drink",
  slug: "chevre-radish-salad-with-pumpkin-seeds",
  title: "Chevre-Radish Salad with Pumpkin Seeds",
  description: "Increase Max Magicka and Stamina by 4936 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 68248,
  itemIds: [68248, 68249, 68250],
  seconds: 5400,
  level: "CP150",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4936 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4936 },
  ],
  status: "supported",
  hashPlace: 306,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
