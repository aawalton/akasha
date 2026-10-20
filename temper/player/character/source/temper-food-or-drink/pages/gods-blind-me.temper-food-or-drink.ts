import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const godsBlindMe = {
  id: "01a15a12-c8af-7edc-935d-99d87dc23213",
  type: "page-type/temper-food-or-drink",
  slug: "gods-blind-me",
  title: "Gods-Blind-Me",
  description: "Increase Health Recovery by 404 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28433,
  itemIds: [28433, 57158, 57161],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 404 }],
  status: "supported",
  hashPlace: 80,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
