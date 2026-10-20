import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetHorkerStew = {
  id: "01a15a12-c8bd-751b-ae17-ed20b58fcc86",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-horker-stew",
  title: "Sweet Horker Stew",
  description: "Increase Max Health by 5066 and Max Magicka by 4635 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 57144,
  itemIds: [57144, 57145, 57146],
  seconds: 5400,
  level: "CP100",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5066 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4635 },
  ],
  status: "supported",
  hashPlace: 261,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
