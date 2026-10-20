import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetScampSake = {
  id: "01a15a12-c8be-7113-add4-0525605942aa",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-scamp-sake",
  title: "Sweet Scamp Sake",
  description: "Increase Health Recovery by 385 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57639,
  itemIds: [57639, 61061, 61064],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 385 }],
  status: "supported",
  hashPlace: 280,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
