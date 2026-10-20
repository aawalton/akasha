import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const necromBeetleCheesePoutine = {
  id: "01a15a12-c8b5-752b-94cd-0bc1e8b763fc",
  type: "page-type/temper-food-or-drink",
  slug: "necrom-beetle-cheese-poutine",
  title: "Necrom Beetle-Cheese Poutine",
  description: "Increase Max Health by 3355 and Max Stamina by 3070 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_002.dds",
  foodOrDrinkKind: "food",
  itemId: 43092,
  itemIds: [43092, 57091, 57094],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3355 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3070 },
  ],
  status: "supported",
  hashPlace: 246,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
