import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tonicOfPortentFavor = {
  id: "01a15a12-c8c1-76ab-9454-054e65e74cb9",
  type: "page-type/temper-food-or-drink",
  slug: "tonic-of-portent-favor",
  title: "Tonic of Portent Favor",
  description:
    "You gain a 100% Faction favor bonus from all Night Market enemy and district event sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/consumable_potion_014_type_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 224839,
  itemIds: [224839],
  seconds: 1800,
  status: "unsupported",
  hashPlace: 347,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
