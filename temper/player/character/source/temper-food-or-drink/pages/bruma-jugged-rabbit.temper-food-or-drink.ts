import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const brumaJuggedRabbit = {
  id: "01a15a12-c898-7000-b57b-52761b5aa5f0",
  type: "page-type/temper-food-or-drink",
  slug: "bruma-jugged-rabbit",
  title: "Bruma Jugged Rabbit",
  description: "Increase Max Health by 3634 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_meat_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33801,
  itemIds: [33801, 33873, 33885],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3634 }],
  status: "supported",
  hashPlace: 210,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
