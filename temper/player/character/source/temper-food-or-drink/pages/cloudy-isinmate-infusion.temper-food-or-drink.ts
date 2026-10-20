import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudyIsinmateInfusion = {
  id: "01a15a12-c89d-71a5-9fea-0e555c094f36",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-isinmate-infusion",
  title: "cloudy Isinmate Infusion",
  description: "Increase Stamina Recovery by 140 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 32075,
  itemIds: [32075, 32087, 37790, 37838, 37886, 37934],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 140 }],
  status: "supported",
  hashPlace: 146,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
