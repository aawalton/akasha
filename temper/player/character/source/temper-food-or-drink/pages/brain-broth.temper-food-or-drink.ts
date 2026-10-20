import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const brainBroth = {
  id: "01a15a12-c898-7058-ab5e-a953d40b4d62",
  type: "page-type/temper-food-or-drink",
  slug: "brain-broth",
  title: "Brain Broth",
  description:
    "You gain a 100% Experience Point bonus from all sources for 40 minutes. The timer pauses when you are offline, and resumes when you return.",
  icon: "/esoui/art/icons/quest_potion_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 64266,
  itemIds: [64266],
  seconds: 2400,
  effects: [{ metric: "temper-metric/experience-gain", effectType: "fractional-change", value: 1 }],
  status: "supported",
  hashPlace: 298,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
