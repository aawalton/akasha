import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldWestWealdCornChowder = {
  id: "01a15a12-c8a7-7145-a48f-a436210d6ea7",
  type: "page-type/temper-food-or-drink",
  slug: "cold-west-weald-corn-chowder",
  title: "cold West Weald Corn Chowder",
  description: "Increase Max Stamina by 3920 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_soup_003.dds",
  foodOrDrinkKind: "food",
  itemId: 32148,
  itemIds: [32148, 61086],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3920 }],
  status: "supported",
  hashPlace: 179,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
