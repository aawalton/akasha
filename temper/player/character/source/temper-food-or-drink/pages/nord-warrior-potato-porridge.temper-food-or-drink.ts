import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const nordWarriorPotatoPorridge = {
  id: "01a15a12-c8b6-79c4-a419-8950f4f51ef6",
  type: "page-type/temper-food-or-drink",
  slug: "nord-warrior-potato-porridge",
  title: "Nord Warrior Potato Porridge",
  description: "Increase Max Stamina by 4970 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 61085,
  itemIds: [61085],
  seconds: 3960,
  level: "CP100",
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4970 }],
  status: "supported",
  hashPlace: 296,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
