import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const anequinaStout = {
  id: "01a15a12-c894-7c8b-b01c-8f4693650cb4",
  type: "page-type/temper-food-or-drink",
  slug: "anequina-stout",
  title: "Anequina Stout",
  description: "Increase Health Recovery by 368 and Magicka Recovery by 337 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28439,
  itemIds: [28439, 57176, 57179],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 368 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 337 },
  ],
  status: "supported",
  hashPlace: 83,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
