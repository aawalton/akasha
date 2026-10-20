import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const solstheimElkAndScuttle = {
  id: "01a15a12-c8bb-72e8-8423-d5cd85b14cca",
  type: "page-type/temper-food-or-drink",
  slug: "solstheim-elk-and-scuttle",
  title: "Solstheim Elk and Scuttle",
  description: "Increase Max Health by 4460 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33921,
  itemIds: [33921, 57098, 57101],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4460 }],
  status: "supported",
  hashPlace: 224,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
