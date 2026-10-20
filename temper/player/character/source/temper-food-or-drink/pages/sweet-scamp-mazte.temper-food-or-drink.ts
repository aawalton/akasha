import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetScampMazte = {
  id: "01a15a12-c8be-77bd-890a-084803ff4e0e",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-scamp-mazte",
  title: "Sweet Scamp Mazte",
  description: "Increase Health Recovery by 446 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28437,
  itemIds: [28437, 57170, 57173],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 446 }],
  status: "supported",
  hashPlace: 82,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
