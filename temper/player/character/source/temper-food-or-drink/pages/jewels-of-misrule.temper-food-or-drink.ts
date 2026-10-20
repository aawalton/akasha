import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jewelsOfMisrule = {
  id: "01a0e05d-1465-7024-ba36-c76f5d312d0f",
  type: "page-type/temper-food-or-drink",
  slug: "jewels-of-misrule",
  title: "Jewels of Misrule",
  description:
    "Increase Stamina and Magicka Recovery by 357 and Max Health by 3927 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_jester_rockcandy.dds",
  foodOrDrinkKind: "food",
  itemId: 120764,
  itemIds: [120764],
  abilityId: 89971,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 357 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 357 },
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 3927 },
  ],
  status: "supported",
  hashPlace: 13,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
