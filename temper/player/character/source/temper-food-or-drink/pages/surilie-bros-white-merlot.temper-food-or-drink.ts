import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const surilieBrosWhiteMerlot = {
  id: "01a15a12-c8bd-76b2-b3f4-f2112d9f0535",
  type: "page-type/temper-food-or-drink",
  slug: "surilie-bros-white-merlot",
  title: "Surilie Bros. White Merlot",
  description: "Increase Health Recovery by 454 and Stamina Recovery by 415 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 33697,
  itemIds: [33697, 46058, 57198],
  seconds: 5400,
  level: "CP50",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 454 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 415 },
  ],
  status: "supported",
  hashPlace: 207,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
