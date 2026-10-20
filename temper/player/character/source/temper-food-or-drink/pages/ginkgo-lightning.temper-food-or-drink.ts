import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ginkgoLightning = {
  id: "01a15a12-c8af-7813-86f0-f657ef69172d",
  type: "page-type/temper-food-or-drink",
  slug: "ginkgo-lightning",
  title: "Ginkgo Lightning",
  description: "Increase Health Recovery by 171 and Stamina Recovery by 156 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28456,
  itemIds: [28456, 33669, 34002],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 171 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 156 },
  ],
  status: "supported",
  hashPlace: 91,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
