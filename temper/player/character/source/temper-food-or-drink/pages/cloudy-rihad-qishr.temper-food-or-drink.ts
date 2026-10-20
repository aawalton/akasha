import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyRihadQishr = {
  id: "01a15a12-c89d-7b5c-ad2c-6d577b63b8f7",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-rihad-qishr",
  title: "cloudy Rihad Qishr",
  description: "Increase Stamina Recovery by 280 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32123,
  itemIds: [32123, 32135, 37814, 37862, 37910, 37958],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 280 }],
  status: "supported",
  hashPlace: 167,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
