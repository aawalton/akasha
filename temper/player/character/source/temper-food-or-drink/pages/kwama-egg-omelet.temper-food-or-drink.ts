import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const kwamaEggOmelet = {
  id: "01a15a12-c8b2-7442-ab74-5b0790581ef1",
  type: "page-type/temper-food-or-drink",
  slug: "kwama-egg-omelet",
  title: "Kwama Egg Omelet",
  description: "Increase Max Health by 5066 and Max Stamina by 4635 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 57147,
  itemIds: [57147, 57148, 57149],
  seconds: 5400,
  level: "CP100",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5066 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4635 },
  ],
  status: "supported",
  hashPlace: 262,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
