import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const blacklightGingerMazte = {
  id: "01a15a12-c897-7d72-aefd-8e181c5be93d",
  type: "page-type/temper-food-or-drink",
  slug: "blacklight-ginger-mazte",
  title: "Blacklight Ginger Mazte",
  description: "Increase Health Recovery by 407 and Stamina Recovery by 373 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28443,
  itemIds: [28443, 57189, 57190],
  seconds: 5400,
  level: "CP10",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 407 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 373 },
  ],
  status: "supported",
  hashPlace: 85,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
