import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bananaMilletMuffin = {
  id: "01a15a12-c896-7f28-9695-f3f0846f628f",
  type: "page-type/temper-food-or-drink",
  slug: "banana-millet-muffin",
  title: "Banana Millet Muffin",
  description: "Increase Max Magicka by 1436 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_muffin.dds",
  foodOrDrinkKind: "food",
  itemId: 28305,
  itemIds: [28305, 28378, 42807],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 1436 }],
  status: "supported",
  hashPlace: 44,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
