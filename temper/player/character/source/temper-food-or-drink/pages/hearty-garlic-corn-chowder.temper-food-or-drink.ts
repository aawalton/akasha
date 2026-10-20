import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const heartyGarlicCornChowder = {
  id: "01a0e05d-1464-7d23-9326-5d97e28264e2",
  type: "page-type/temper-food-or-drink",
  slug: "hearty-garlic-corn-chowder",
  title: "Hearty Garlic Corn Chowder",
  description: "Increase Max Stamina by 6048 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_soup_002.dds",
  foodOrDrinkKind: "food",
  itemId: 68239,
  itemIds: [68239, 68240, 68241],
  abilityId: 61261,
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 6048 }],
  status: "supported",
  hashPlace: 3,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
