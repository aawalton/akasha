import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const honeyRye = {
  id: "01a15a12-c8b1-7a25-8016-203cbdfa3e03",
  type: "page-type/temper-food-or-drink",
  slug: "honey-rye",
  title: "Honey Rye",
  description: "Increase Health Recovery by 280 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28421,
  itemIds: [28421, 33630, 33963],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 280 }],
  status: "supported",
  hashPlace: 74,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
