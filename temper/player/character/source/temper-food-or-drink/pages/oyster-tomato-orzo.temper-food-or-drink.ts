import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const oysterTomatoOrzo = {
  id: "01a15a12-c8b7-7e34-9e12-ce76dc45a95e",
  type: "page-type/temper-food-or-drink",
  slug: "oyster-tomato-orzo",
  title: "Oyster Tomato Orzo",
  description: "Increase Max Health by 3684 and Max Magicka by 3371 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33913,
  itemIds: [33913, 57105, 57106],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3684 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3371 },
  ],
  status: "supported",
  hashPlace: 221,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
