import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const pickledCarrotSlurry = {
  id: "01a15a12-c8b7-7f30-964f-6bacffb030f1",
  type: "page-type/temper-food-or-drink",
  slug: "pickled-carrot-slurry",
  title: "Pickled Carrot Slurry",
  description: "Increase Max Stamina by 5065 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_stew_002.dds",
  foodOrDrinkKind: "food",
  itemId: 43124,
  itemIds: [43124, 57127, 57128],
  seconds: 3960,
  level: "CP50",
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 5065 }],
  status: "supported",
  hashPlace: 249,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
