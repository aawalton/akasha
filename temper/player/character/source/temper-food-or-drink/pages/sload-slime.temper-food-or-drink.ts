import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sloadSlime = {
  id: "01a15a12-c8ba-705d-a5c5-6d4edeea5b46",
  type: "page-type/temper-food-or-drink",
  slug: "sload-slime",
  title: "Sload Slime",
  description: "Increase Stamina Recovery by 392 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 57652,
  itemIds: [57652, 61071, 61072],
  seconds: 3960,
  level: "CP10",
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 392 }],
  status: "supported",
  hashPlace: 289,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
