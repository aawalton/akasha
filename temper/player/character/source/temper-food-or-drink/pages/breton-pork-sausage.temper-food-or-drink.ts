import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bretonPorkSausage = {
  id: "01a15a12-c898-7ce0-8eea-afbeb2940e89",
  type: "page-type/temper-food-or-drink",
  slug: "breton-pork-sausage",
  title: "Breton Pork Sausage",
  description: "Increase Max Health by 2395 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_sausage.dds",
  foodOrDrinkKind: "food",
  itemId: 28342,
  itemIds: [28342, 28398, 33484],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 2395 }],
  status: "supported",
  hashPlace: 58,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
