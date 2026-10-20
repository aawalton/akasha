import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetDuneGnocchi = {
  id: "01a15a12-c8bd-7d73-9e9a-cceb968652cf",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-dune-gnocchi",
  title: "Sweet Dune Gnocchi",
  description: "Increase Max Magicka and Stamina by 2468 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33591,
  itemIds: [33591, 33852, 42759],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2468 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2468 },
  ],
  status: "supported",
  hashPlace: 199,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
