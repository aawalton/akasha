import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const rabbitMilletPilaf = {
  id: "01a15a12-c8b8-74d2-aed9-24732652d8c3",
  type: "page-type/temper-food-or-drink",
  slug: "rabbit-millet-pilaf",
  title: "Rabbit Millet Pilaf",
  description: "Increase Max Health by 1982 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28313,
  itemIds: [28313, 28386, 33849],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 1982 }],
  status: "supported",
  hashPlace: 48,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
