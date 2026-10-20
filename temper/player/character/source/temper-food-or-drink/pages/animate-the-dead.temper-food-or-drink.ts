import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const animateTheDead = {
  id: "01a15a12-c894-7fc8-948e-57f6d0a54861",
  type: "page-type/temper-food-or-drink",
  slug: "animate-the-dead",
  title: "Animate-the-Dead",
  description:
    "Increase Health Recovery by 341 and Magicka and Stamina Recovery by 313 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28403,
  itemIds: [28403, 33440, 33454, 33603],
  seconds: 9000,
  level: "CP10",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 341 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 313 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 313 },
  ],
  status: "supported",
  hashPlace: 65,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
