import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const blueRoadMarathon = {
  id: "01a15a12-c897-7beb-afa1-0240c26125d4",
  type: "page-type/temper-food-or-drink",
  slug: "blue-road-marathon",
  title: "Blue Road Marathon",
  description: "Increase Stamina Recovery by 370 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28513,
  itemIds: [28513, 57162, 57163],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 370 }],
  status: "supported",
  hashPlace: 122,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
