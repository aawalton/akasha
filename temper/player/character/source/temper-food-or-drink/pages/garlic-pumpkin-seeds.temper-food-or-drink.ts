import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const garlicPumpkinSeeds = {
  id: "01a15a12-c8ae-7ed6-941e-d2ae057adaa0",
  type: "page-type/temper-food-or-drink",
  slug: "garlic-pumpkin-seeds",
  title: "Garlic Pumpkin Seeds",
  description: "Increase Max Magicka by 2192 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33490,
  itemIds: [33490, 33552, 42814],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 2192 }],
  status: "supported",
  hashPlace: 188,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
