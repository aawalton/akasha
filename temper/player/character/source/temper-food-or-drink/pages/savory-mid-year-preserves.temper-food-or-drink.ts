import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const savoryMidYearPreserves = {
  id: "01a15a12-c8b9-7e39-beb6-e4e2190a7fb4",
  type: "page-type/temper-food-or-drink",
  slug: "savory-mid-year-preserves",
  title: "Savory Mid Year Preserves",
  description: "Increase Max Magicka and Stamina by 3732 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_jam_pot.dds",
  foodOrDrinkKind: "food",
  itemId: 28332,
  itemIds: [28332, 57121, 57122],
  seconds: 5400,
  level: "CP10",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3732 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3732 },
  ],
  status: "supported",
  hashPlace: 55,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
