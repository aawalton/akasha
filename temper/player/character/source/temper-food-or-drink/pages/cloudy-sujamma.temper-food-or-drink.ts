import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudySujamma = {
  id: "01a15a12-c89d-73c9-954c-6d6f043d14fc",
  type: "page-type/temper-food-or-drink",
  slug: "cloudy-sujamma",
  title: "Cloudy Sujamma",
  description: "Increase Stamina Recovery by 175 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 32093,
  itemIds: [32093, 32105, 37796, 37844, 37892, 37940, 61049, 61050],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 175 }],
  status: "supported",
  hashPlace: 152,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
