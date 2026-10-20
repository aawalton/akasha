import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const mythicAetherialAmbrosia = {
  id: "01a15a12-c8b5-7225-8578-3667df5ecb48",
  type: "page-type/temper-food-or-drink",
  slug: "mythic-aetherial-ambrosia",
  title: "Mythic Aetherial Ambrosia",
  description:
    "You gain a 150% Experience Point bonus from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return. This bonus is compatible with other foods or drinks.",
  icon: "/esoui/art/icons/consumeable_experience_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 115027,
  itemIds: [115027],
  seconds: 1800,
  effects: [
    { "metric": "temper-metric/experience-gain", "effectType": "fractional-change", "value": 1.5 },
  ],
  status: "supported",
  hashPlace: 333,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
