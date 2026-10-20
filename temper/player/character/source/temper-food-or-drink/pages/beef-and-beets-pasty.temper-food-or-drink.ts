import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const beefAndBeetsPasty = {
  id: "01a15a12-c896-75c2-aaeb-06e638cbdb3b",
  type: "page-type/temper-food-or-drink",
  slug: "beef-and-beets-pasty",
  title: "Beef and Beets Pasty",
  description: "Increase Max Health by 2039 and Max Stamina by 1866 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fruit_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 33416,
  itemIds: [33416, 33487, 33537],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 2039 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1866 },
  ],
  status: "supported",
  hashPlace: 184,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
