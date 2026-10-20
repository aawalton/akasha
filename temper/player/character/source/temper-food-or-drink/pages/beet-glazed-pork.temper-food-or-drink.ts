import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const beetGlazedPork = {
  id: "01a15a12-c896-7b0d-92ba-5cf0db614d28",
  type: "page-type/temper-food-or-drink",
  slug: "beet-glazed-pork",
  title: "Beet-Glazed Pork",
  description: "Increase Max Health by 1381 and Max Stamina by 1264 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_pork.dds",
  foodOrDrinkKind: "food",
  itemId: 28304,
  itemIds: [28304, 28353, 33403],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 1381 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1264 },
  ],
  status: "supported",
  hashPlace: 43,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
