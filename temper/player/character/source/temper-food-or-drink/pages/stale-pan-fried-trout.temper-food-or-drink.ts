import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const stalePanFriedTrout = {
  id: "01a15a12-c8bc-7a99-9293-46928fd48396",
  type: "page-type/temper-food-or-drink",
  slug: "stale-pan-fried-trout",
  title: "stale Pan-Fried Trout",
  description: "Increase Max Health by 1540 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_004.dds",
  foodOrDrinkKind: "food",
  itemId: 32077,
  itemIds: [32077, 32089, 37792, 37840, 37888, 37936],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 1540 }],
  status: "supported",
  hashPlace: 148,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
