import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const mintmeadKaveh = {
  id: "01a15a12-c8b4-7dc1-89d8-0943598d0877",
  type: "page-type/temper-food-or-drink",
  slug: "mintmead-kaveh",
  title: "Mintmead Kaveh",
  description: "Increase Magicka and Stamina Recovery by 246 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28508,
  itemIds: [28508, 33735, 34068],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 246 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 246 },
  ],
  status: "supported",
  hashPlace: 118,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
