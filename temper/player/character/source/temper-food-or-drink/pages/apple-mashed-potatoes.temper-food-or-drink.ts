import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const appleMashedPotatoes = {
  id: "01a15a12-c894-7cca-8bed-97c3da273370",
  type: "page-type/temper-food-or-drink",
  slug: "apple-mashed-potatoes",
  title: "Apple Mashed Potatoes",
  description: "Increase Max Magicka and Stamina by 2167 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_bowl_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33511,
  itemIds: [33511, 33573, 42799],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2167 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2167 },
  ],
  status: "supported",
  hashPlace: 195,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
