import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const rosyIslandAle = {
  id: "01a15a12-c8b9-7aad-a265-00377c85998f",
  type: "page-type/temper-food-or-drink",
  slug: "rosy-island-ale",
  title: "Rosy Island Ale",
  description: "Increase Health Recovery by 335 and Magicka Recovery by 307 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28435,
  itemIds: [28435, 57164, 57167],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 335 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 307 },
  ],
  status: "supported",
  hashPlace: 81,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
