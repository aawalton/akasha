import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sencheTigerSingleMalt = {
  id: "01a15a12-c8b9-7666-bd95-9706036b192d",
  type: "page-type/temper-food-or-drink",
  slug: "senche-tiger-single-malt",
  title: "Senche-Tiger Single Malt",
  description:
    "Increase Health Recovery by 446 and Magicka and Stamina Recovery by 410 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 68273,
  itemIds: [68273, 68274, 68275, 68276],
  seconds: 9000,
  level: "CP150",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 446 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 410 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 410 },
  ],
  status: "supported",
  hashPlace: 308,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
