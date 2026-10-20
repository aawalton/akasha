import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const aetherialAmbrosia = {
  id: "01a15a12-c892-7e30-b0eb-ca9c6d6f4068",
  type: "page-type/temper-food-or-drink",
  slug: "aetherial-ambrosia",
  title: "Aetherial Ambrosia",
  description:
    "You gain a 100% Experience Point bonus from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/consumeable_experience_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 120076,
  itemIds: [120076],
  seconds: 1800,
  effects: [{ metric: "temper-metric/experience-gain", effectType: "fractional-change", value: 1 }],
  status: "supported",
  hashPlace: 334,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
