import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bretonPintOfBitters = {
  id: "01a15a12-c898-7e60-a941-358eff71f012",
  type: "page-type/temper-food-or-drink",
  slug: "breton-pint-of-bitters",
  title: "Breton Pint of Bitters",
  description: "Increase Health Recovery by 454 and Magicka Recovery by 415 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 33984,
  itemIds: [33984, 46062, 57197],
  seconds: 5400,
  level: "CP50",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 454 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 415 },
  ],
  status: "supported",
  hashPlace: 228,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
