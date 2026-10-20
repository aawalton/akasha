import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const mistralBananaBunnyHash = {
  id: "01a0e05d-1465-7863-9b12-aa1c83497b20",
  type: "page-type/temper-food-or-drink",
  slug: "mistral-banana-bunny-hash",
  title: "Mistral Banana-Bunny Hash",
  description: "Increase Max Health by 5395 and Max Magicka by 4936 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_001.dds",
  foodOrDrinkKind: "food",
  itemId: 68242,
  itemIds: [68242, 68244],
  abilityId: 72959,
  seconds: 5400,
  level: "CP150",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5395 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4936 },
  ],
  status: "supported",
  hashPlace: 4,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
