import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const stormholdBakedBananas33587 = {
  id: "01a15a12-c8bc-7f79-a19c-7f5b5650dc03",
  type: "page-type/temper-food-or-drink",
  slug: "stormhold-baked-bananas-33587",
  title: "Stormhold Baked Bananas",
  description: "Increase Max Magicka by 2948 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33587,
  itemIds: [33587, 33789, 42790],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2948 }],
  status: "supported",
  hashPlace: 198,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
