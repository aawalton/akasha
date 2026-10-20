import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tawnyPort = {
  id: "01a15a12-c8c0-7209-8a02-2f876d0427a0",
  type: "page-type/temper-food-or-drink",
  slug: "tawny-port",
  title: "Tawny Port",
  description: "Increase Health Recovery by 198 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28413,
  itemIds: [28413, 33618, 33951],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 198 }],
  status: "supported",
  hashPlace: 69,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
