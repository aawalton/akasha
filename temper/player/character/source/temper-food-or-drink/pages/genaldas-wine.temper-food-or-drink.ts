import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const genaldasWine = {
  id: "01a15a12-c8af-7564-b850-62d85b0f6bee",
  type: "page-type/temper-food-or-drink",
  slug: "genaldas-wine",
  title: "Genalda's Wine",
  description:
    "Increase Stamina Recovery by 574 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/consumable_potion_004_type_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 188143,
  itemIds: [188143],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 574 }],
  status: "supported",
  hashPlace: 346,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
