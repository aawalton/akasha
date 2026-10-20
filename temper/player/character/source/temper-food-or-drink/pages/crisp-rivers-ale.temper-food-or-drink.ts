import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crispRiversAle = {
  id: "01a15a12-c8a9-75aa-a67a-c5750543d9a1",
  type: "page-type/temper-food-or-drink",
  slug: "crisp-rivers-ale",
  title: "Crisp River'S Ale",
  description: "Increase Magicka Recovery by 226 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_wine_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28466,
  itemIds: [28466, 32098, 32110],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 226 }],
  status: "supported",
  hashPlace: 97,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
