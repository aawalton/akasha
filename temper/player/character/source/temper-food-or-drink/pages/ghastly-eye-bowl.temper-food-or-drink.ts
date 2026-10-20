import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ghastlyEyeBowl = {
  id: "01a0e05d-1464-7fe2-afea-f88015b9d459",
  type: "page-type/temper-food-or-drink",
  slug: "ghastly-eye-bowl",
  title: "Ghastly Eye Bowl",
  description:
    "Increase Max Magicka by 4936 and Magicka Recovery by 493 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_skull_cup_eyeballs.dds",
  foodOrDrinkKind: "drink",
  itemId: 87695,
  itemIds: [87695],
  abilityId: 84700,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4936 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 493 },
  ],
  status: "supported",
  hashPlace: 25,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
