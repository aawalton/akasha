import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const highlandRabbitStew = {
  id: "01a15a12-c8b0-7b6a-9abd-ba039a650393",
  type: "page-type/temper-food-or-drink",
  slug: "highland-rabbit-stew",
  title: "Highland Rabbit Stew",
  description: "Increase Max Health by 2368 and Max Stamina by 2167 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_003.dds",
  foodOrDrinkKind: "food",
  itemId: 33498,
  itemIds: [33498, 33560, 42786],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 2368 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 2167 },
  ],
  status: "supported",
  hashPlace: 191,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
