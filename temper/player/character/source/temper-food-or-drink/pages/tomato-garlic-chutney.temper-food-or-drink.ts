import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tomatoGarlicChutney = {
  id: "01a15a12-c8c1-79d4-a49b-3d4a594e8f10",
  type: "page-type/temper-food-or-drink",
  slug: "tomato-garlic-chutney",
  title: "Tomato Garlic Chutney",
  description: "Increase Max Magicka by 5320 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_jam_pot.dds",
  foodOrDrinkKind: "food",
  itemId: 57631,
  itemIds: [57631],
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 5320 }],
  status: "supported",
  hashPlace: 277,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
