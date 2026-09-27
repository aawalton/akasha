import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const lilmothGarlicHagfish = {
  id: "01a0e05b-0a64-78a8-860e-6557cf4b8540",
  type: "page-type/temper-food-or-drink",
  slug: "lilmoth-garlic-hagfish",
  title: "Lilmoth Garlic Hagfish",
  description: "Increases Max Health by 6608 for 35 minutes.",
  icon: "/esoui/art/icons/crafting_skillet_004.dds",
  foodOrDrinkKind: "food",
  itemId: 68235,
  abilityId: 17407,
  seconds: 2100,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 6608 }],
  hashPlace: 1,
} as const satisfies TemperFoodOrDrink
