import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const corintheCornBeef = {
  id: "01a15a12-c8a9-70a8-b3f5-04b7ea60f353",
  type: "page-type/temper-food-or-drink",
  slug: "corinthe-corn-beef",
  title: "Corinthe Corn Beef",
  description: "Increase Max Health by 1785 and Max Magicka and Max Stamina by 1642 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 57080,
  itemIds: [57080],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 1785 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1642 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1642 },
  ],
  status: "supported",
  hashPlace: 255,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
