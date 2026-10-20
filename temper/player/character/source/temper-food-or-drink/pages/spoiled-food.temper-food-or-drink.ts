import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const spoiledFood = {
  id: "01a15a12-c8bb-7cc7-9610-3f215d81b52c",
  type: "page-type/temper-food-or-drink",
  slug: "spoiled-food",
  title: "Spoiled Food",
  description: "This spoiled food smells particularly foul.",
  icon: "/esoui/art/icons/quest_monster_organ_003.dds",
  foodOrDrinkKind: "food",
  itemId: 57660,
  itemIds: [57660],
  seconds: 0,
  status: "unsupported",
  hashPlace: 292,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
