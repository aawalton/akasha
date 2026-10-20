import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const flatHoneyRye = {
  id: "01a15a12-c8ad-7ac4-9a81-84b5c5c25eb2",
  type: "page-type/temper-food-or-drink",
  slug: "flat-honey-rye",
  title: "flat Honey Rye",
  description: "Increase Health Recovery by 231 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32097,
  itemIds: [32097, 32109, 37800, 37848, 61051],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 231 }],
  status: "supported",
  hashPlace: 156,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
