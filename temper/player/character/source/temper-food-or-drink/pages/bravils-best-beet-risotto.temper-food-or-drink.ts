import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bravilsBestBeetRisotto = {
  id: "01a15a12-c898-7cce-90aa-58f6a6ea873b",
  type: "page-type/temper-food-or-drink",
  slug: "bravils-best-beet-risotto",
  title: "Bravil's Best Beet Risotto",
  description: "Increase Max Stamina by 5320 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_002.dds",
  foodOrDrinkKind: "food",
  itemId: 71252,
  itemIds: [71252],
  seconds: 3960,
  level: "CP150",
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 5320 }],
  status: "supported",
  hashPlace: 321,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
