import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const centurionsFriendKaveh = {
  id: "01a15a12-c89a-7bdc-9f77-0c99024d18e6",
  type: "page-type/temper-food-or-drink",
  slug: "centurions-friend-kaveh",
  title: "Centurion's Friend Kaveh",
  description: "Increase Magicka and Stamina Recovery by 337 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 33458,
  itemIds: [33458, 57180, 57181],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 337 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 337 },
  ],
  status: "supported",
  hashPlace: 187,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
