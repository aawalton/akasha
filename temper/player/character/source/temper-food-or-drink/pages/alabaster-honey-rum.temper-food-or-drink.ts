import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const alabasterHoneyRum = {
  id: "01a15a12-c893-77d3-a183-c62283f4d65e",
  type: "page-type/temper-food-or-drink",
  slug: "alabaster-honey-rum",
  title: "Alabaster Honey Rum",
  description: "Increase Health Recovery by 619 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57200,
  itemIds: [57200, 57201, 57202],
  seconds: 3960,
  level: "CP100",
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 619 }],
  status: "supported",
  hashPlace: 267,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
