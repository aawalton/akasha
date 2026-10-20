import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const mudcrabCornFritters = {
  id: "01a15a12-c8b4-7d64-8b30-7c3fa346f37c",
  type: "page-type/temper-food-or-drink",
  slug: "mudcrab-corn-fritters",
  title: "Mudcrab Corn Fritters",
  description: "Increase Max Health by 3026 and Max Stamina by 2769 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_fish_stick.dds",
  foodOrDrinkKind: "food",
  itemId: 33596,
  itemIds: [33596, 33797, 33857],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3026 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2769 },
  ],
  status: "supported",
  hashPlace: 202,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
