import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const murkyLotusTea = {
  id: "01a15a12-c8b4-7e25-bed6-9853c508ee35",
  type: "page-type/temper-food-or-drink",
  slug: "murky-lotus-tea",
  title: "murky Lotus Tea",
  description: "Increase Magicka Recovery by 70 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 32140,
  itemIds: [32140, 32152, 37873, 37921, 61083],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 70 }],
  status: "supported",
  hashPlace: 173,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
