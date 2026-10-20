import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedRedoranPepperedMelon = {
  id: "01a15a12-c8a8-7ab2-b081-22219cdae0a6",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-redoran-peppered-melon",
  title: "congealed Redoran Peppered Melon",
  description: "Increase Max Magicka by 1750 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_fruit_003.dds",
  foodOrDrinkKind: "food",
  itemId: 32096,
  itemIds: [32096, 32108, 37799, 37847, 37895, 37943],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1750 }],
  status: "supported",
  hashPlace: 155,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
