import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jasminkgoTonic = {
  id: "01a15a12-c8b2-7fde-adaa-61176fdd534d",
  type: "page-type/temper-food-or-drink",
  slug: "jasminkgo-tonic",
  title: "Jasminkgo Tonic",
  description: "Increase Magicka and Stamina Recovery by 276 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28512,
  itemIds: [28512, 33741, 34074],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 276 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 276 },
  ],
  status: "supported",
  hashPlace: 121,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
