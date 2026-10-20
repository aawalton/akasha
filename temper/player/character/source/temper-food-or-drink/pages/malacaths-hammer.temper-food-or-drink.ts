import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const malacathsHammer = {
  id: "01a15a12-c8b3-77cb-ad10-678a63fd3ca3",
  type: "page-type/temper-food-or-drink",
  slug: "malacaths-hammer",
  title: "Malacath's Hammer",
  description:
    "Increase Health Recovery by 378 and Magicka and Stamina Recovery by 347 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28483,
  itemIds: [28483, 33699, 33982, 46057],
  seconds: 9000,
  level: "CP50",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 378 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 347 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 347 },
  ],
  status: "supported",
  hashPlace: 106,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
