import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const flatTawnyPort = {
  id: "01a15a12-c8ad-7a45-8485-b68798772eec",
  type: "page-type/temper-food-or-drink",
  slug: "flat-tawny-port",
  title: "flat Tawny Port",
  description: "Increase Health Recovery by 154 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 32073,
  itemIds: [32073, 32085, 37788, 37836, 61047],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 154 }],
  status: "supported",
  hashPlace: 144,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
