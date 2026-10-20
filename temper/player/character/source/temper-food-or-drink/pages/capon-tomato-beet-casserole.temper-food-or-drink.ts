import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const caponTomatoBeetCasserole = {
  id: "01a15a12-c89a-7152-bec6-156ac2f3c3d2",
  type: "page-type/temper-food-or-drink",
  slug: "capon-tomato-beet-casserole",
  title: "Capon Tomato-Beet Casserole",
  description: "Increase Max Health by 4462 and Max Magicka and Max Stamina by 4105 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 68251,
  itemIds: [68251, 68252, 68253, 68254],
  seconds: 9000,
  level: "CP150",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4462 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4105 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4105 },
  ],
  status: "supported",
  hashPlace: 307,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
