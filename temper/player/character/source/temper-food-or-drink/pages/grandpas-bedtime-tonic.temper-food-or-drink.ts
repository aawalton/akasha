import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const grandpasBedtimeTonic = {
  id: "01a15a12-c8af-7d4e-b15c-d020c42ef91a",
  type: "page-type/temper-food-or-drink",
  slug: "grandpas-bedtime-tonic",
  title: "Grandpa's Bedtime Tonic",
  description: "Increase Stamina Recovery by 453 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28444,
  itemIds: [28444, 57186, 57187],
  seconds: 3960,
  level: "CP10",
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 453 }],
  status: "supported",
  hashPlace: 86,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
