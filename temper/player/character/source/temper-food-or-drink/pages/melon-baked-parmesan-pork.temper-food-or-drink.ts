import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const melonBakedParmesanPork = {
  id: "01a1564c-6947-70a0-a28e-47a25e508b94",
  type: "page-type/temper-food-or-drink",
  slug: "melon-baked-parmesan-pork",
  title: "Melon-Baked Parmesan Pork",
  description: "Increase Max Health by 5395 and Max Magicka by 4936 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 68243,
  itemIds: [68243],
  abilityId: 61257,
  seconds: 5400,
  level: "CP150",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5395 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4936 },
  ],
  status: "supported",
  hashPlace: 34,
  createdAt: "2026-10-19T22:33:30.694Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
