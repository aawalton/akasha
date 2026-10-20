import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bowlOfPeeledEyeballs = {
  id: "01a15a12-c898-702f-acf4-047ec12f304e",
  type: "page-type/temper-food-or-drink",
  slug: "bowl-of-peeled-eyeballs",
  title: 'Bowl of "Peeled Eyeballs"',
  description:
    "Increase Magicka Recovery by 459 and Health Recovery by 505 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_skull_cup_grapes.dds",
  foodOrDrinkKind: "drink",
  itemId: 87687,
  itemIds: [87687],
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 459 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 505 },
  ],
  status: "supported",
  hashPlace: 325,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
