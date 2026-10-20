import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldPortHundingCheeseFries = {
  id: "01a15a12-c8a6-7fc2-b016-21e938909269",
  type: "page-type/temper-food-or-drink",
  slug: "cold-port-hunding-cheese-fries",
  title: "cold Port Hunding Cheese Fries",
  description: "Increase Max Stamina by 1400 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fish_stick.dds",
  foodOrDrinkKind: "food",
  itemId: 32076,
  itemIds: [32076, 32088, 37791, 37839, 37887, 37935],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1400 }],
  status: "supported",
  hashPlace: 147,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
