import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const argonianPumpkinStew = {
  id: "01a15a12-c895-7446-9018-22383588ba48",
  type: "page-type/temper-food-or-drink",
  slug: "argonian-pumpkin-stew",
  title: "Argonian Pumpkin Stew",
  description: "Increase Max Health by 2039 and Max Magicka by 1866 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 28397,
  itemIds: [28397, 33480, 42808],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 2039 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 1866 },
  ],
  status: "supported",
  hashPlace: 62,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
