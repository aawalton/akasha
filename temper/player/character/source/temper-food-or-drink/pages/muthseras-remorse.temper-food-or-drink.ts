import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const muthserasRemorse = {
  id: "01a0e05d-1465-7deb-93da-96c513d1eec3",
  type: "page-type/temper-food-or-drink",
  slug: "muthseras-remorse",
  title: "Muthseras Remorse",
  description: "Increases Magicka Recovery by 604 for 35 minutes.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 68260,
  abilityId: 61325,
  seconds: 2100,
  level: "CP150",
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 604 }],
  hashPlace: 19,
} as const satisfies TemperFoodOrDrink
