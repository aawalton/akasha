import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const flatRyeInYourEye = {
  id: "01a15a12-c8ad-7e51-be86-db427d78aab8",
  type: "page-type/temper-food-or-drink",
  slug: "flat-rye-in-your-eye",
  title: "flat Rye-in-your-Eye",
  description: "Increase Health Recovery by 308 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32121,
  itemIds: [32121, 32133, 37812, 37860, 37908, 37956],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 308 }],
  status: "supported",
  hashPlace: 165,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
