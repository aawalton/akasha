import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const rieklingSucklingBristleback = {
  id: "01a15a12-c8b8-79fa-ad23-aae2026b23fa",
  type: "page-type/temper-food-or-drink",
  slug: "riekling-suckling-bristleback",
  title: "Riekling Suckling Bristleback",
  description: "Increase Max Health by 2310 and Max Magicka and Max Stamina by 2125 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 57082,
  itemIds: [57082],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 2310 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 2125 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 2125 },
  ],
  status: "supported",
  hashPlace: 257,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
