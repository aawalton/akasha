import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const khajiitiSweetStuffedDuck = {
  id: "01a15a12-c8b2-702c-80aa-1551a24d0065",
  type: "page-type/temper-food-or-drink",
  slug: "khajiiti-sweet-stuffed-duck",
  title: "Khajiiti Sweet-Stuffed Duck",
  description: "Increase Max Health by 4540 and Max Magicka by 4153 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_chicken.dds",
  foodOrDrinkKind: "food",
  itemId: 43097,
  itemIds: [43097, 57130, 57131],
  seconds: 5400,
  level: "CP50",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4540 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4153 },
  ],
  status: "supported",
  hashPlace: 248,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
