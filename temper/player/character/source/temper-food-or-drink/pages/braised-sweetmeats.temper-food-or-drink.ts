import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const braisedSweetmeats = {
  id: "01a15a12-c898-7639-821a-b5763019bbe7",
  type: "page-type/temper-food-or-drink",
  slug: "braised-sweetmeats",
  title: "Braised Sweetmeats",
  description: "Increase Max Health by 3412 and Max Magicka and Max Stamina by 3139 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33796,
  itemIds: [33796, 33862, 33928, 43128],
  seconds: 9000,
  level: "CP10",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3412 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3139 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 3139 },
  ],
  status: "supported",
  hashPlace: 209,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
