import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const khenarthisWingsChai = {
  id: "01a15a12-c8b2-7f1d-98ef-9750a38999be",
  type: "page-type/temper-food-or-drink",
  slug: "khenarthis-wings-chai",
  title: "Khenarthi's Wings Chai",
  description: "Increase Magicka Recovery by 506 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28482,
  itemIds: [28482, 46061, 57195],
  seconds: 3960,
  level: "CP50",
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 506 }],
  status: "supported",
  hashPlace: 105,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
