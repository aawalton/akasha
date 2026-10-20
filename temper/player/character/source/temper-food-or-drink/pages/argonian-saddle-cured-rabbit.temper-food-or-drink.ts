import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const argonianSaddleCuredRabbit = {
  id: "01a15a12-c895-78d5-84a5-302482c6503b",
  type: "page-type/temper-food-or-drink",
  slug: "argonian-saddle-cured-rabbit",
  title: "Argonian Saddle-Cured Rabbit",
  description: "Increase Max Health by 5534 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_meat_002.dds",
  foodOrDrinkKind: "food",
  itemId: 43142,
  itemIds: [43142, 57123, 57126],
  seconds: 3960,
  level: "CP50",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 5534 }],
  status: "supported",
  hashPlace: 250,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
