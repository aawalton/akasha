import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const markarthMead = {
  id: "01a0e05d-1465-7911-970c-f7e9b36a89be",
  type: "page-type/temper-food-or-drink",
  slug: "markarth-mead",
  title: "Markarth Mead",
  description: "Increase Health Recovery by 660 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 68257,
  itemIds: [68255, 68256, 68257],
  abilityId: 61322,
  seconds: 3960,
  level: "CP150",
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 660 }],
  status: "supported",
  hashPlace: 18,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
