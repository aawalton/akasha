import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const foodMeat = {
  id: "01a0e11d-738a-79c2-9f28-6a4f3d313438",
  type: "page-type/temper-specialized-item-type",
  slug: "food-meat",
  title: "Meat Dish",
  esoSpecializedItemTypeNumber: 1,
} as const satisfies TemperSpecializedItemType
