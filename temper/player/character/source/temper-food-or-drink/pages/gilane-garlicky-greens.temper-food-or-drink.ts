import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const gilaneGarlickyGreens = {
  id: "01a15a12-c8af-7bdd-9100-a338ccfad051",
  type: "page-type/temper-food-or-drink",
  slug: "gilane-garlicky-greens",
  title: "Gilane Garlicky Greens",
  description: "Increase Max Stamina by 1436 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_002.dds",
  foodOrDrinkKind: "food",
  itemId: 28297,
  itemIds: [28297, 28330, 28370],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1436 }],
  status: "supported",
  hashPlace: 40,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
