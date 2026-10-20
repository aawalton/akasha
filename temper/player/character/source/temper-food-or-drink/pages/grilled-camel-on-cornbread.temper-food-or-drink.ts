import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const grilledCamelOnCornbread = {
  id: "01a15a12-c8b0-70c2-8f8c-5adad023ead9",
  type: "page-type/temper-food-or-drink",
  slug: "grilled-camel-on-cornbread",
  title: "Grilled Camel on Cornbread",
  description: "Increase Max Health by 4079 and Max Stamina by 3732 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_sirloin.dds",
  foodOrDrinkKind: "food",
  itemId: 33924,
  itemIds: [33924, 57117, 57120],
  seconds: 5400,
  level: "CP10",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4079 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3732 },
  ],
  status: "supported",
  hashPlace: 225,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
