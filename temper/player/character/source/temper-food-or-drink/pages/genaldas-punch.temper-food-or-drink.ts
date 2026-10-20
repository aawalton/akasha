import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const genaldasPunch = {
  id: "01a15a12-c8ae-7afb-ac6b-167673c04e7a",
  type: "page-type/temper-food-or-drink",
  slug: "genaldas-punch",
  title: "Genalda's Punch",
  description:
    "Increase Magicka Recovery and Stamina Recovery by 344 and Health Recovery by 378 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/consumable_potion_006_type_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 188141,
  itemIds: [188141],
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 344 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 344 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 378 },
  ],
  status: "supported",
  hashPlace: 345,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
