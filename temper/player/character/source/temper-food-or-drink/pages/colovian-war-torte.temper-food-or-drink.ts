import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const colovianWarTorte = {
  id: "01a15a12-c8a7-72b7-b9a7-39a837283607",
  type: "page-type/temper-food-or-drink",
  slug: "colovian-war-torte",
  title: "Colovian War Torte",
  description:
    "You gain a 50% experience bonus to Alliance Rank and Alliance War skill lines from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/crownstore_consumable_entremet_cake.dds",
  foodOrDrinkKind: "food",
  itemId: 171323,
  itemIds: [171323],
  seconds: 1800,
  status: "unsupported",
  hashPlace: 342,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
