import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const senchalCurryFishAndRice = {
  id: "01a15a12-c8b9-71bb-997c-5941dabe00d7",
  type: "page-type/temper-food-or-drink",
  slug: "senchal-curry-fish-and-rice",
  title: "Senchal Curry Fish and Rice",
  description: "Increase Max Health by 3221 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_003.dds",
  foodOrDrinkKind: "food",
  itemId: 28350,
  itemIds: [28350, 33520, 33581],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3221 }],
  status: "supported",
  hashPlace: 60,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
