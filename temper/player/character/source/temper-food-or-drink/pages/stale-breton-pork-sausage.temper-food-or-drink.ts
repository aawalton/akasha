import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const staleBretonPorkSausage = {
  id: "01a15a12-c8bb-700a-a2e5-295426c796e8",
  type: "page-type/temper-food-or-drink",
  slug: "stale-breton-pork-sausage",
  title: "stale Breton Pork Sausage",
  description: "Increase Max Health by 1925 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_sausage.dds",
  foodOrDrinkKind: "food",
  itemId: 37798,
  itemIds: [37798, 37846, 37894, 37942, 61039],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 1925 }],
  status: "supported",
  hashPlace: 234,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
