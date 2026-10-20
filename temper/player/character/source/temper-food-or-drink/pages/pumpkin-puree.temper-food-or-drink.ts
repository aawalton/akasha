import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const pumpkinPuree = {
  id: "01a15a12-c8b8-7544-afe2-4122a8781808",
  type: "page-type/temper-food-or-drink",
  slug: "pumpkin-puree",
  title: "Pumpkin Puree",
  description: "Increase Max Magicka by 700 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_soup_002.dds",
  foodOrDrinkKind: "food",
  itemId: 30449,
  itemIds: [30449, 30461, 37780, 37781, 37829, 37877, 37925],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 700 }],
  status: "supported",
  hashPlace: 138,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
