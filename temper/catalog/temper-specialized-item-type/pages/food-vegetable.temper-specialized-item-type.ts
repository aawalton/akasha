import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const foodVegetable = {
  id: "01a0e11d-738a-789f-b7e9-3098fad7e08c",
  type: "page-type/temper-specialized-item-type",
  slug: "food-vegetable",
  title: "Vegetable Dish",
  esoSpecializedItemTypeNumber: 3,
} as const satisfies TemperSpecializedItemType
