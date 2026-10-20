import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const whiteGoldWarTorte = {
  id: "01a15a12-c8c2-7fdf-8f6e-79d616b8665c",
  type: "page-type/temper-food-or-drink",
  slug: "white-gold-war-torte",
  title: "White-Gold War Torte",
  description:
    "You gain a 150% experience bonus to Alliance Rank and Alliance War skill lines from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/ava_skill_boost_food_002.dds",
  foodOrDrinkKind: "food",
  itemId: 171432,
  itemIds: [171432],
  seconds: 1800,
  status: "unsupported",
  hashPlace: 344,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
