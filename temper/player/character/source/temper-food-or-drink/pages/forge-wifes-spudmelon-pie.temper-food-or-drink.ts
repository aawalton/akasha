import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const forgeWifesSpudmelonPie = {
  id: "01a15a12-c8ae-7de6-8425-43bad6d74952",
  type: "page-type/temper-food-or-drink",
  slug: "forge-wifes-spudmelon-pie",
  title: "Forge-Wife's Spudmelon Pie",
  description: "Increase Max Magicka and Stamina by 2769 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_open_top_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 33810,
  itemIds: [33810, 33870, 33895],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2769 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2769 },
  ],
  status: "supported",
  hashPlace: 213,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
