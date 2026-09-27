import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const ingredientTea = {
  id: "01a0e11d-738a-781d-8f6b-62806d0453f0",
  type: "page-type/temper-specialized-item-type",
  slug: "ingredient-tea",
  title: "Tea Ingredient",
  esoSpecializedItemTypeNumber: 45,
} as const satisfies TemperSpecializedItemType
