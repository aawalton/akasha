import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const darkSeducer = {
  id: "01a15a12-c8ac-7132-a711-5f4e98781f88",
  type: "page-type/temper-food-or-drink",
  slug: "dark-seducer",
  title: "Dark Seducer",
  description: "Increase Health Recovery by 335 and Stamina Recovery by 307 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28476,
  itemIds: [28476, 57165, 57166],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 335 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 307 },
  ],
  status: "supported",
  hashPlace: 102,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
