import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const ingredientFruit = {
  id: "01a0e11d-738a-7fb5-bd98-a5f8cf93695f",
  type: "page-type/temper-specialized-item-type",
  slug: "ingredient-fruit",
  title: "Fruit Ingredient",
  esoSpecializedItemTypeNumber: 42,
} as const satisfies TemperSpecializedItemType
