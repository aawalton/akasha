import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const magesMead = {
  id: "01a15a12-c8b3-7d56-bd08-65b8cbd9fd40",
  type: "page-type/temper-food-or-drink",
  slug: "mages-mead",
  title: "Mage's Mead",
  description: "Increase Magicka and Stamina Recovery by 373 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 33650,
  itemIds: [33650, 57192, 57193],
  seconds: 5400,
  level: "CP10",
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 373 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 373 },
  ],
  status: "supported",
  hashPlace: 205,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
