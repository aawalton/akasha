import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownCombatMysticsStew = {
  id: "01a15a12-c8a9-773c-b404-943452b734bb",
  type: "page-type/temper-food-or-drink",
  slug: "crown-combat-mystics-stew",
  title: "Crown Combat Mystic's Stew",
  description:
    "Increase Max Magicka by 4936 and Max Health by 5453 for 1.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/crowncrate_magickahealth_food.dds",
  foodOrDrinkKind: "food",
  itemId: 124675,
  itemIds: [124675],
  seconds: 5400,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4936 },
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5453 },
  ],
  status: "supported",
  hashPlace: 336,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
