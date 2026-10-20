import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ginkgoDoubleBrandy = {
  id: "01a15a12-c8af-7006-a88f-ab417effe4d4",
  type: "page-type/temper-food-or-drink",
  slug: "ginkgo-double-brandy",
  title: "Ginkgo Double Brandy",
  description: "Increase Health Recovery by 236 and Stamina Recovery by 216 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28464,
  itemIds: [28464, 33681, 34014],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 236 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 216 },
  ],
  status: "supported",
  hashPlace: 95,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
