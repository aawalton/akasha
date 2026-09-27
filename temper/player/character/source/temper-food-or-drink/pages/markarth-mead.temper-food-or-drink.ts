import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const markarthMead = {
  id: "01a0e05d-1465-7911-970c-f7e9b36a89be",
  type: "page-type/temper-food-or-drink",
  slug: "markarth-mead",
  title: "Markarth Mead",
  description: "Increases Health Recovery by 660 for 35 minutes.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 68257,
  abilityId: 61322,
  seconds: 2100,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 660 }],
  hashPlace: 18,
} as const satisfies TemperFoodOrDrink
