import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const aetherialTea = {
  id: "01a15a12-c893-732d-a260-cf0808a37774",
  type: "page-type/temper-food-or-drink",
  slug: "aetherial-tea",
  title: "Aetherial Tea",
  description: "Increase Magicka Recovery by 453 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 33602,
  itemIds: [33602, 57183, 57184],
  seconds: 3960,
  level: "CP10",
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 453 }],
  status: "supported",
  hashPlace: 204,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
