import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const moltenWarTorte = {
  id: "01a15a12-c8b4-7da2-91c3-dd099edb1835",
  type: "page-type/temper-food-or-drink",
  slug: "molten-war-torte",
  title: "Molten War Torte",
  description:
    "You gain a 100% experience bonus to Alliance Rank and Alliance War skill lines from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/ava_skill_boost_food_001.dds",
  foodOrDrinkKind: "food",
  itemId: 171329,
  itemIds: [171329],
  seconds: 1800,
  status: "unsupported",
  hashPlace: 343,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
