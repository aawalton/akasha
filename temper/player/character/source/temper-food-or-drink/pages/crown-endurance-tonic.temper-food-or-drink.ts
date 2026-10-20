import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownEnduranceTonic = {
  id: "01a15a12-c8a9-7700-a1be-06525011d3a2",
  type: "page-type/temper-food-or-drink",
  slug: "crown-endurance-tonic",
  title: "Crown Endurance Tonic",
  description:
    "Increase Stamina Recovery by 565 for 2.5 hours.\nThese effects are scaled based on your level, up to Veteran Rank 10.",
  icon: "/esoui/art/icons/store_staminadrink_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 64499,
  itemIds: [64499],
  seconds: 9000,
  level: "Scaled",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 565 }],
  status: "supported",
  hashPlace: 305,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
