import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const hasphatsStickyGuarTonic = {
  id: "01a15a12-c8b0-7e97-bdf3-7497767fb442",
  type: "page-type/temper-food-or-drink",
  slug: "hasphats-sticky-guar-tonic",
  title: "Hasphat's Sticky Guar Tonic",
  description: "Increase Stamina Recovery by 567 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 57206,
  itemIds: [57206, 57207, 57208],
  seconds: 3960,
  level: "CP100",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 567 }],
  status: "supported",
  hashPlace: 269,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
