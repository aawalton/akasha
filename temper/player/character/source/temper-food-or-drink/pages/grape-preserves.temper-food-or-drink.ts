import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const grapePreserves = {
  id: "01a15a12-c8b0-7147-8a44-827b783f4ef5",
  type: "page-type/temper-food-or-drink",
  slug: "grape-preserves",
  title: "Grape Preserves",
  description: "Increase Max Magicka by 350 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_jam_pot.dds",
  foodOrDrinkKind: "food",
  itemId: 30448,
  itemIds: [30448, 30460, 37775, 37823, 37871, 37919],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 350 }],
  status: "supported",
  hashPlace: 137,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
