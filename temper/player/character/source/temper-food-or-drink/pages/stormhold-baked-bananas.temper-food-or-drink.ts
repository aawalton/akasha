import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const stormholdBakedBananas = {
  id: "01a15a12-c8bc-72fb-b2d7-25d95cb30867",
  type: "page-type/temper-food-or-drink",
  slug: "stormhold-baked-bananas",
  title: "Stormhold Baked Bananas",
  description: "Increase Max Magicka by 2450 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_001.dds",
  foodOrDrinkKind: "food",
  itemId: 32132,
  itemIds: [32132, 37811, 37859, 37907, 37955],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2450 }],
  status: "supported",
  hashPlace: 171,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
