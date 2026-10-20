import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const timberMammothAle = {
  id: "01a15a12-c8c1-7660-81f8-da4e7f4eb863",
  type: "page-type/temper-food-or-drink",
  slug: "timber-mammoth-ale",
  title: "Timber Mammoth Ale",
  description: "Increase Health Recovery by 138 and Stamina Recovery by 126 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28452,
  itemIds: [28452, 33663, 33996],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 138 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 126 },
  ],
  status: "supported",
  hashPlace: 89,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
