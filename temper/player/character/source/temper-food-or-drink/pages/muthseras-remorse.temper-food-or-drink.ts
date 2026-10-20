import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const muthserasRemorse = {
  id: "01a0e05d-1465-7deb-93da-96c513d1eec3",
  type: "page-type/temper-food-or-drink",
  slug: "muthseras-remorse",
  title: "Muthsera's Remorse",
  description: "Increase Magicka Recovery by 604 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 68260,
  itemIds: [68258, 68259, 68260],
  abilityId: 61325,
  seconds: 3960,
  level: "CP150",
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 604 }],
  status: "supported",
  hashPlace: 19,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
