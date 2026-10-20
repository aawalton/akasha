import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const coldAlikrBeetsWithGoatCheese = {
  id: "01a15a12-c8a5-7572-9ae0-7c4175ea0822",
  type: "page-type/temper-food-or-drink",
  slug: "cold-alikr-beets-with-goat-cheese",
  title: "cold Alik'r Beets with Goat Cheese",
  description: "Increase Max Stamina by 1750 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 37797,
  itemIds: [37797, 37845, 37941],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1750 }],
  status: "supported",
  hashPlace: 233,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
