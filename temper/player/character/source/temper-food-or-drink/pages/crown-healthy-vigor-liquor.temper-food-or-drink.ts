import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownHealthyVigorLiquor = {
  id: "01a15a12-c8aa-771b-ae40-ba707e74ec7f",
  type: "page-type/temper-food-or-drink",
  slug: "crown-healthy-vigor-liquor",
  title: "Crown Healthy Vigor Liquor",
  description:
    "Increase Health Recovery by 621 for 2.5 hours.\nThese effects are scaled based on your level, up to Veteran Rank 10.",
  icon: "/esoui/art/icons/store_healthdrink_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 64497,
  itemIds: [64497],
  seconds: 9000,
  level: "Scaled",
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 621 }],
  status: "supported",
  hashPlace: 303,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
