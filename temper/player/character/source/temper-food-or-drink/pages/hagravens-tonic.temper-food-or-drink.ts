import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const hagravensTonic = {
  id: "01a0e05d-1464-766c-aa28-c2bf9211769e",
  type: "page-type/temper-food-or-drink",
  slug: "hagravens-tonic",
  title: "Hagraven's Tonic",
  description: "Increase Stamina Recovery by 604 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_leather_vitriol.dds",
  foodOrDrinkKind: "drink",
  itemId: 68263,
  itemIds: [68261, 68262, 68263],
  abilityId: 61328,
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 604 }],
  status: "supported",
  hashPlace: 20,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
