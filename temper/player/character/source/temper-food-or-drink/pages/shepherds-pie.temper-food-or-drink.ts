import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const shepherdsPie = {
  id: "01a15a12-c8ba-7793-9225-dacea7f41955",
  type: "page-type/temper-food-or-drink",
  slug: "shepherds-pie",
  title: "Shepherd's Pie",
  description: "Increase Max Health by 1710 and Max Stamina by 1565 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_vendor_fuel_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 28316,
  itemIds: [28316, 33409, 33528],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 1710 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1565 },
  ],
  status: "supported",
  hashPlace: 49,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
