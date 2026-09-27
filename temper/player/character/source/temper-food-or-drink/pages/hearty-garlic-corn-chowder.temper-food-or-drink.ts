import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const heartyGarlicCornChowder = {
  id: "01a0e05d-1464-7d23-9326-5d97e28264e2",
  type: "page-type/temper-food-or-drink",
  slug: "hearty-garlic-corn-chowder",
  title: "Hearty Garlic Corn Chowder",
  description: "Increases Max Stamina by 6048 for 35 minutes.",
  icon: "/esoui/art/icons/crafting_soup_002.dds",
  foodOrDrinkKind: "food",
  itemId: 68239,
  abilityId: 61261,
  seconds: 2100,
  level: "CP150",
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 6048 }],
  hashPlace: 3,
} as const satisfies TemperFoodOrDrink
