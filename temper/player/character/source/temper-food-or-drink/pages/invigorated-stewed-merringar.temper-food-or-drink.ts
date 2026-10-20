import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const invigoratedStewedMerringar = {
  id: "01a0e05d-1465-770d-b62a-7c00214eafb8",
  type: "page-type/temper-food-or-drink",
  slug: "invigorated-stewed-merringar",
  title: "Invigorated Stewed Merringar",
  description: "Increase Max Magicka and Stamina by 0 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 43218,
  itemIds: [43218],
  abilityId: 72961,
  seconds: 5400,
  level: "CP160",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4928 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4928 },
  ],
  hashPlace: 6,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
