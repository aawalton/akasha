import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37795 = {
  id: "01a15a12-c8be-7719-9932-1aa95a9d5034",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37795",
  title: "Swill",
  description: "Increase Magicka Recovery by 189 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37795,
  itemIds: [37795, 37843],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 189 }],
  status: "supported",
  hashPlace: 232,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
