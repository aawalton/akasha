import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const psijicAmbrosia = {
  id: "01a15a12-c8b8-70e6-8842-d99bee14ae15",
  type: "page-type/temper-food-or-drink",
  slug: "psijic-ambrosia",
  title: "Psijic Ambrosia",
  description:
    "You gain a 50% Experience Point bonus from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/quest_potion_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 64221,
  itemIds: [64221],
  seconds: 1800,
  effects: [
    { "metric": "temper-metric/experience-gain", "effectType": "fractional-change", "value": 0.5 },
  ],
  status: "supported",
  hashPlace: 297,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
