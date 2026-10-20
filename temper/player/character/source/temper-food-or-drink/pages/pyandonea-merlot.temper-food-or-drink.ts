import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const pyandoneaMerlot = {
  id: "01a15a12-c8b8-701e-b29f-6b394c0718f5",
  type: "page-type/temper-food-or-drink",
  slug: "pyandonea-merlot",
  title: "Pyandonea Merlot",
  description: "Increase Health Recovery by 302 and Stamina Recovery by 276 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28472,
  itemIds: [28472, 33693, 34026],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 302 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 276 },
  ],
  status: "supported",
  hashPlace: 100,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
