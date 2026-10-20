import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const orzorgasBloodPricePie = {
  id: "01a15a12-c8b6-7a74-abe8-410975c9b89b",
  type: "page-type/temper-food-or-drink",
  slug: "orzorgas-blood-price-pie",
  title: "Orzorga's Blood Price Pie",
  description: "Increase Max Health by 5395 and Health Recovery by 539 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fruit_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 71058,
  itemIds: [71058],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5395 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 539 },
  ],
  status: "supported",
  hashPlace: 311,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
