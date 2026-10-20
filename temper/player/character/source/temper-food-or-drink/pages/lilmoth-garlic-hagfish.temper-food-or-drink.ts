import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const lilmothGarlicHagfish = {
  id: "01a0e05b-0a64-78a8-860e-6557cf4b8540",
  type: "page-type/temper-food-or-drink",
  slug: "lilmoth-garlic-hagfish",
  title: "Lilmoth Garlic Hagfish",
  description: "Increase Max Health by 6608 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_skillet_004.dds",
  foodOrDrinkKind: "food",
  itemId: 68235,
  itemIds: [68233, 68234, 68235],
  abilityId: 61259,
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 6607 }],
  status: "supported",
  hashPlace: 1,
  createdAt: "2026-09-27T00:54:17.956Z",
  updatedAt: "2026-10-20T16:17:39.355Z",
} as const satisfies TemperFoodOrDrink
