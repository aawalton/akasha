import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownRefreshingDrink = {
  id: "01a0e05d-1464-7b7c-84ef-76d3bd63d173",
  type: "page-type/temper-food-or-drink",
  slug: "crown-refreshing-drink",
  title: "Crown Refreshing Drink",
  description:
    "Increase Health Recovery by 446, Magicka Recovery by 410, and Stamina Recovery by 410 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/store_tricolor_drink_01.dds",
  foodOrDrinkKind: "drink",
  itemId: 64712,
  itemIds: [64712, 135112],
  abilityId: 17614,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 446 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 410 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 410 },
  ],
  status: "supported",
  hashPlace: 24,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
