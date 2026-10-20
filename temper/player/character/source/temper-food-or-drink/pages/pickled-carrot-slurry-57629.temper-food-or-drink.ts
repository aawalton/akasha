import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const pickledCarrotSlurry57629 = {
  id: "01a15a12-c8b7-79a6-8b37-31ce1146e031",
  type: "page-type/temper-food-or-drink",
  slug: "pickled-carrot-slurry-57629",
  title: "Pickled Carrot Slurry",
  description: "Increase Max Stamina by 4410 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 57629,
  itemIds: [57629],
  seconds: 3960,
  level: "CP50",
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4410 }],
  status: "supported",
  hashPlace: 275,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
