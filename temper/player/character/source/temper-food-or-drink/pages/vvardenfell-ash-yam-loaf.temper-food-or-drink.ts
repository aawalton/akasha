import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const vvardenfellAshYamLoaf = {
  id: "01a15a12-c8c2-7804-a7fc-9c670eaafd64",
  type: "page-type/temper-food-or-drink",
  slug: "vvardenfell-ash-yam-loaf",
  title: "Vvardenfell Ash Yam Loaf",
  description: "Increase Max Stamina by 4082 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_french_loaf.dds",
  foodOrDrinkKind: "food",
  itemId: 33915,
  itemIds: [33915, 57102, 57103],
  seconds: 3960,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4082 }],
  status: "supported",
  hashPlace: 222,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
