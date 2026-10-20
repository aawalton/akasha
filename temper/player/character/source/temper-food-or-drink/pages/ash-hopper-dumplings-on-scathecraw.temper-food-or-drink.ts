import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ashHopperDumplingsOnScathecraw = {
  id: "01a15a12-c895-754c-8685-fa8e336044a3",
  type: "page-type/temper-food-or-drink",
  slug: "ash-hopper-dumplings-on-scathecraw",
  title: "Ash-Hopper Dumplings on Scathecraw",
  description: "Increase Max Health by 3684 and Max Stamina by 3371 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_fried_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33906,
  itemIds: [33906, 57104, 57107],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3684 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3371 },
  ],
  status: "supported",
  hashPlace: 219,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
