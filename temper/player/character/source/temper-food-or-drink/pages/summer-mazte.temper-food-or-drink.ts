import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const summerMazte = {
  id: "01a15a12-c8bc-7fcd-9638-a60e462451b4",
  type: "page-type/temper-food-or-drink",
  slug: "summer-mazte",
  title: "Summer Mazte",
  description: "Increase Health Recovery by 302 and Magicka Recovery by 276 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28431,
  itemIds: [28431, 33644, 33977],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 302 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 276 },
  ],
  status: "supported",
  hashPlace: 79,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
