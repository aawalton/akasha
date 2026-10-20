import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const porkAndBitterMelon = {
  id: "01a15a12-c8b7-7884-b6fc-956cbc88868e",
  type: "page-type/temper-food-or-drink",
  slug: "pork-and-bitter-melon",
  title: "Pork and Bitter Melon",
  description: "Increase Max Health by 2368 and Max Magicka by 2167 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_pork.dds",
  foodOrDrinkKind: "food",
  itemId: 33505,
  itemIds: [33505, 33567, 42793],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 2368 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2167 },
  ],
  status: "supported",
  hashPlace: 193,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
