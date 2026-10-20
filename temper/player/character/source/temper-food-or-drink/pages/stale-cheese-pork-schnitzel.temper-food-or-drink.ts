import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleCheesePorkSchnitzel = {
  id: "01a15a12-c8bb-7958-98f5-938341f061da",
  type: "page-type/temper-food-or-drink",
  slug: "stale-cheese-pork-schnitzel",
  title: "stale Cheese Pork Schnitzel",
  description: "Increase Max Health by 2310 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_003.dds",
  foodOrDrinkKind: "food",
  itemId: 32095,
  itemIds: [32095, 32101, 32107, 32113, 37804, 37852, 37900, 37948],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 2310 }],
  status: "supported",
  hashPlace: 154,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
