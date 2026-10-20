import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const hearthfireHarvestPilaf = {
  id: "01a15a12-c8b0-7bc0-ba81-12d00f725f2e",
  type: "page-type/temper-food-or-drink",
  slug: "hearthfire-harvest-pilaf",
  title: "Hearthfire Harvest Pilaf",
  description: "Increase Max Magicka and Stamina by 1866 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33493,
  itemIds: [33493, 33540, 33555],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1866 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 1866 },
  ],
  status: "supported",
  hashPlace: 189,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
