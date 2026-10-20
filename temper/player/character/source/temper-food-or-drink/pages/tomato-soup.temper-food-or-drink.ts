import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tomatoSoup = {
  id: "01a15a12-c8c1-7563-a71d-722d0bf38e15",
  type: "page-type/temper-food-or-drink",
  slug: "tomato-soup",
  title: "Tomato Soup",
  description: "Increase Max Magicka by 1058 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_soup_006.dds",
  foodOrDrinkKind: "food",
  itemId: 28293,
  itemIds: [28293, 28366, 33843],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 1058 }],
  status: "supported",
  hashPlace: 39,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
