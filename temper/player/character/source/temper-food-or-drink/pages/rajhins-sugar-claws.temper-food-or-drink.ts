import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const rajhinsSugarClaws = {
  id: "01a1566c-326b-725d-b9cd-837e5c4530f8",
  type: "page-type/temper-food-or-drink",
  slug: "rajhins-sugar-claws",
  title: "Rajhin's Sugar Claws",
  description:
    "Increase Max Stamina by 5600 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_sugar_claws.dds",
  foodOrDrinkKind: "food",
  itemId: 112438,
  itemIds: [112438],
  abilityId: 86787,
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 5600 }],
  status: "supported",
  hashPlace: 35,
  createdAt: "2026-10-19T23:08:13.802Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
