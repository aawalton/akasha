import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bitterRemorseAle = {
  id: "01a15a12-c897-7d9f-a9da-4a3c87091cc5",
  type: "page-type/temper-food-or-drink",
  slug: "bitter-remorse-ale",
  title: "Bitter Remorse Ale",
  description: "Increase Health Recovery by 236 and Magicka Recovery by 216 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28423,
  itemIds: [28423, 33632, 33965],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 236 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 216 },
  ],
  status: "supported",
  hashPlace: 75,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
