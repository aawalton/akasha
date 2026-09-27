import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const hagravensTonic = {
  id: "01a0e05d-1464-766c-aa28-c2bf9211769e",
  type: "page-type/temper-food-or-drink",
  slug: "hagravens-tonic",
  title: "Hagravens Tonic",
  description: "Increases Stamina Recovery by 604 for 35 minutes.",
  icon: "/esoui/art/icons/crafting_leather_vitriol.dds",
  foodOrDrinkKind: "drink",
  itemId: 68263,
  abilityId: 61328,
  seconds: 2100,
  level: "CP150",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 604 }],
  hashPlace: 20,
} as const satisfies TemperFoodOrDrink
