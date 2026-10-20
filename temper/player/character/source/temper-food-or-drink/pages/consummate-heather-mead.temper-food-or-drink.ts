import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const consummateHeatherMead = {
  id: "01a15a12-c8a8-7ba9-ab60-dd8f4183c346",
  type: "page-type/temper-food-or-drink",
  slug: "consummate-heather-mead",
  title: "Consummate Heather Mead",
  description: "Increase Health, Magicka and Stamina Recovery by 197 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 34021,
  itemIds: [34021],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 197 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 197 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 197 },
  ],
  status: "supported",
  hashPlace: 229,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
