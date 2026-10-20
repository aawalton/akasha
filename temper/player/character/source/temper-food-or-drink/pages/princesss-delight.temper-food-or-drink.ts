import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const princesssDelight = {
  id: "01a15a12-c8b7-7336-9600-02f01302c430",
  type: "page-type/temper-food-or-drink",
  slug: "princesss-delight",
  title: "Princess's Delight",
  description:
    "Increase Max Magicka by 5600 for 2.5 hours.\nThese effects are scaled based on your level.\nMay also surprise and delight.",
  icon: "/esoui/art/icons/event_jester_butterflytartlet.dds",
  foodOrDrinkKind: "food",
  itemId: 120436,
  itemIds: [120436],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 5600 }],
  status: "partially-supported",
  hashPlace: 335,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
