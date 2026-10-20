import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const parrotAndPumpkinSalad = {
  id: "01a15a12-c8b7-75e7-9185-d053d95f5e8a",
  type: "page-type/temper-food-or-drink",
  slug: "parrot-and-pumpkin-salad",
  title: "Parrot-and-Pumpkin Salad",
  description: "Increase Max Health by 3097 and Max Magicka and Max Stamina by 2849 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_salad_004.dds",
  foodOrDrinkKind: "food",
  itemId: 33808,
  itemIds: [33808, 33868, 33919, 57110],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3097 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2849 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2849 },
  ],
  status: "supported",
  hashPlace: 212,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
