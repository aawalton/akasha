import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const foodFruit = {
  id: "01a0e11d-738a-7cce-832a-ef2659a4db52",
  type: "page-type/temper-specialized-item-type",
  slug: "food-fruit",
  title: "Fruit Dish",
  esoSpecializedItemTypeNumber: 2,
} as const satisfies TemperSpecializedItemType
